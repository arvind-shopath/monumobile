// Cloudflare Pages Function: /api/sync
// Connects Monu Mobile Solution frontend to Cloudflare D1 SQL Database

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "no-store, no-cache, must-revalidate"
    }
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}

// GET: Retrieve live state from Cloudflare D1
export async function onRequestGet(context) {
  const { env } = context;
  try {
    if (!env.DB) {
      return jsonResponse({ success: false, error: "Database binding DB not available" }, 503);
    }

    // 1. Fetch master state blob if exists
    const masterRow = await env.DB.prepare("SELECT data_json FROM app_state WHERE key = 'master_state'").first();
    let state = masterRow && masterRow.data_json ? JSON.parse(masterRow.data_json) : null;

    // 2. Fetch live relational data
    const [attRows, invRows, jobRows, expRows, invtRows] = await Promise.all([
      env.DB.prepare("SELECT * FROM attendance ORDER BY created_at DESC LIMIT 200").all(),
      env.DB.prepare("SELECT * FROM invoices ORDER BY created_at DESC LIMIT 200").all(),
      env.DB.prepare("SELECT * FROM repair_jobs ORDER BY updated_at DESC LIMIT 200").all(),
      env.DB.prepare("SELECT * FROM expenses ORDER BY created_at DESC LIMIT 200").all(),
      env.DB.prepare("SELECT * FROM inventory").all()
    ]);

    // Format attendance rows
    const attendance = (attRows.results || []).map(r => ({
      id: r.id,
      empId: r.emp_id,
      empName: r.emp_name,
      employeeId: r.emp_id,
      employeeName: r.emp_name,
      branchId: r.branch_id,
      branchName: r.branch_name,
      date: r.date,
      inTime: r.in_time,
      outTime: r.out_time,
      duration: r.duration,
      status: r.status,
      lat: r.lat,
      lng: r.lng,
      distance: r.distance,
      photo: r.photo,
      createdAt: r.created_at
    }));

    // Format invoice rows
    const invoices = (invRows.results || []).map(r => {
      let items = [];
      try { items = JSON.parse(r.items); } catch(e) {}
      return {
        id: r.id,
        billNo: r.bill_no,
        customerName: r.customer_name,
        customerPhone: r.customer_phone,
        customerType: r.customer_type,
        branchId: r.branch_id,
        branchName: r.branch_name,
        date: r.date,
        items,
        total: r.total,
        discount: r.discount,
        net: r.net,
        paid: r.paid,
        due: r.due,
        paymentMode: r.payment_mode,
        createdAt: r.created_at
      };
    });

    // Format repair job rows
    const jobs = (jobRows.results || []).map(r => ({
      id: r.id,
      tokenNo: r.token_no,
      customerName: r.customer_name,
      customerPhone: r.customer_phone,
      brand: r.brand,
      model: r.model,
      problem: r.problem,
      estCost: r.est_cost,
      finalCost: r.final_cost,
      status: r.status,
      branchId: r.branch_id,
      branchName: r.branch_name,
      assignedTo: r.assigned_to,
      createdAt: r.created_at,
      updatedAt: r.updated_at
    }));

    // Format expenses
    const expenses = (expRows.results || []).map(r => ({
      id: r.id,
      branchId: r.branch_id,
      category: r.category,
      title: r.title,
      amount: r.amount,
      paidTo: r.paid_to,
      paymentMode: r.payment_mode,
      date: r.date,
      createdAt: r.created_at
    }));

    return jsonResponse({
      success: true,
      source: "cloudflare_d1",
      timestamp: new Date().toISOString(),
      counts: {
        attendance: attendance.length,
        invoices: invoices.length,
        jobs: jobs.length,
        expenses: expenses.length
      },
      data: {
        attendance,
        invoices,
        jobs,
        expenses,
        masterState: state
      }
    });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message }, 500);
  }
}

// POST: Save individual events or full backup to Cloudflare D1
export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    if (!env.DB) {
      return jsonResponse({ success: false, error: "Database binding DB not available" }, 503);
    }

    const payload = await request.json();
    const { action } = payload;

    if (action === 'save_attendance') {
      const a = payload.record || payload.data;
      if (!a || !a.empId) {
        return jsonResponse({ success: false, error: "Invalid attendance record" }, 400);
      }

      const id = a.id || `att_${Date.now()}`;
      await env.DB.prepare(`
        INSERT INTO attendance (id, emp_id, emp_name, branch_id, branch_name, date, in_time, out_time, duration, status, lat, lng, distance, photo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          out_time = excluded.out_time,
          duration = excluded.duration,
          status = excluded.status,
          photo = CASE WHEN excluded.photo IS NOT NULL AND excluded.photo != '' THEN excluded.photo ELSE attendance.photo END
      `).bind(
        id,
        a.empId,
        a.empName || a.employeeName || 'Staff',
        a.branchId || 'branch_hazratganj',
        a.branchName || '',
        a.date || new Date().toISOString().split('T')[0],
        a.inTime || '',
        a.outTime || '',
        Number(a.duration) || 0,
        a.status || 'on-time',
        Number(a.lat) || 0,
        Number(a.lng) || 0,
        Number(a.distance) || 0,
        a.photo || null
      ).run();

      return jsonResponse({ success: true, id, message: "Attendance saved to Cloudflare D1" });
    }

    if (action === 'save_invoice') {
      const inv = payload.invoice || payload.data;
      if (!inv) return jsonResponse({ success: false, error: "Missing invoice data" }, 400);

      const id = inv.id || `inv_${Date.now()}`;
      await env.DB.prepare(`
        INSERT INTO invoices (id, bill_no, customer_name, customer_phone, customer_type, branch_id, branch_name, date, items, total, discount, net, paid, due, payment_mode)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          paid = excluded.paid,
          due = excluded.due,
          payment_mode = excluded.payment_mode
      `).bind(
        id,
        inv.billNo || id,
        inv.customerName || 'Walk-in',
        inv.customerPhone || '',
        inv.customerType || 'retail',
        inv.branchId || 'branch_hazratganj',
        inv.branchName || '',
        inv.date || new Date().toISOString().split('T')[0],
        JSON.stringify(inv.items || []),
        Number(inv.total) || 0,
        Number(inv.discount) || 0,
        Number(inv.net) || 0,
        Number(inv.paid) || 0,
        Number(inv.due) || 0,
        inv.paymentMode || 'cash'
      ).run();

      return jsonResponse({ success: true, id, message: "Invoice saved to Cloudflare D1" });
    }

    if (action === 'save_job') {
      const job = payload.job || payload.data;
      if (!job) return jsonResponse({ success: false, error: "Missing job data" }, 400);

      const id = job.id || `job_${Date.now()}`;
      await env.DB.prepare(`
        INSERT INTO repair_jobs (id, token_no, customer_name, customer_phone, brand, model, problem, est_cost, final_cost, status, branch_id, branch_name, assigned_to, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(id) DO UPDATE SET
          final_cost = excluded.final_cost,
          status = excluded.status,
          assigned_to = excluded.assigned_to,
          updated_at = CURRENT_TIMESTAMP
      `).bind(
        id,
        job.tokenNo || id,
        job.customerName || '',
        job.customerPhone || '',
        job.brand || '',
        job.model || '',
        job.problem || '',
        Number(job.estCost) || 0,
        Number(job.finalCost) || 0,
        job.status || 'received',
        job.branchId || 'branch_hazratganj',
        job.branchName || '',
        job.assignedTo || ''
      ).run();

      return jsonResponse({ success: true, id, message: "Job saved to Cloudflare D1" });
    }

    if (action === 'save_expense') {
      const exp = payload.expense || payload.data;
      if (!exp) return jsonResponse({ success: false, error: "Missing expense data" }, 400);

      const id = exp.id || `exp_${Date.now()}`;
      await env.DB.prepare(`
        INSERT INTO expenses (id, branch_id, category, title, amount, paid_to, payment_mode, date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          amount = excluded.amount,
          paid_to = excluded.paid_to
      `).bind(
        id,
        exp.branchId || 'branch_hazratganj',
        exp.category || 'General',
        exp.title || '',
        Number(exp.amount) || 0,
        exp.paidTo || '',
        exp.paymentMode || 'cash',
        exp.date || new Date().toISOString().split('T')[0]
      ).run();

      return jsonResponse({ success: true, id, message: "Expense saved to Cloudflare D1" });
    }

    if (action === 'sync_master_state') {
      const stateObj = payload.state;
      if (!stateObj) return jsonResponse({ success: false, error: "Missing state object" }, 400);

      const jsonStr = JSON.stringify(stateObj);
      await env.DB.prepare(`
        INSERT INTO app_state (key, data_json, updated_at)
        VALUES ('master_state', ?, CURRENT_TIMESTAMP)
        ON CONFLICT(key) DO UPDATE SET
          data_json = excluded.data_json,
          updated_at = CURRENT_TIMESTAMP
      `).bind(jsonStr).run();

      return jsonResponse({ success: true, message: "Master state synced to Cloudflare D1" });
    }

    return jsonResponse({ success: false, error: "Unknown action: " + action }, 400);
  } catch (err) {
    return jsonResponse({ success: false, error: err.message }, 500);
  }
}
