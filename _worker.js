// Cloudflare Pages Advanced Worker: _worker.js
// Enterprise Cloud Backend: Primary Database + Real-Time Sync + Data Lifecycle & Purge Engine

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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    // 1. Health check: /api/health (Enterprise branding - zero mentions of free tools)
    
    // 1.1 Zero-Touch Client Auto-Update Endpoint: /api/version
    if (url.pathname === "/api/version") {
      return jsonResponse({
        success: true,
        version: "11.0",
        build: "20261118_116",
        timestamp: Date.now()
      });
    }

    if (url.pathname === "/api/health") {
      return jsonResponse({
        success: true,
        status: "connected",
        server: "MMS Enterprise Dedicated Cloud",
        cloud_active: true,
        timestamp: new Date().toISOString()
      });
    }

    
    // 2. Public Live Token & Mobile Tracker API: /api/track?q=...
    
    // 2.1 R2 / Cloud Image Upload Endpoint: /api/attendance/selfie
    if (url.pathname === "/api/attendance/selfie" && request.method === "POST") {
      try {
        const body = await request.json();
        const { photo, empId, token } = body;
        if (!photo) return jsonResponse({ success: false, error: "Photo data required" }, 400);

        const photoId = `selfie_${empId || 'emp'}_${Date.now()}.jpg`;

        // If Cloudflare R2 is bound as env.R2 or env.PHOTO_BUCKET
        if (env.R2 || env.PHOTO_BUCKET) {
          const bucket = env.R2 || env.PHOTO_BUCKET;
          const base64Data = photo.replace(/^data:image\/\w+;base64,/, "");
          const buffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
          await bucket.put(photoId, buffer, {
            httpMetadata: { contentType: "image/jpeg" }
          });
          return jsonResponse({ success: true, photoUrl: `/api/attendance/selfie/${photoId}` });
        }

        // Resilient free-tier fallback: Return compressed image data directly
        return jsonResponse({ success: true, photoUrl: photo });
      } catch (e) {
        return jsonResponse({ success: false, error: e.message }, 500);
      }
    }

    if (url.pathname.startsWith("/api/attendance/selfie/") && request.method === "GET") {
      const key = url.pathname.replace("/api/attendance/selfie/", "");
      if ((env.R2 || env.PHOTO_BUCKET) && key) {
        const bucket = env.R2 || env.PHOTO_BUCKET;
        const object = await bucket.get(key);
        if (object) {
          const headers = new Headers();
          object.writeHttpMetadata(headers);
          headers.set("etag", object.httpEtag);
          return new Response(object.body, { headers });
        }
      }
      return jsonResponse({ error: "Photo not found" }, 404);
    }

    if (url.pathname === "/api/track") {
      const q = (url.searchParams.get("q") || "").trim().toUpperCase();
      if (!q) {
        return jsonResponse({ success: false, error: "Query parameter required" }, 400);
      }

      const cleanPhone = q.replace(/[^0-9]/g, '');

      // Check KV Cache first
      let allJobs = [];
      let allInvoices = [];
      if (env.KV) {
        try {
          const raw = await env.KV.get("monu_master_sync");
          if (raw) {
            const parsed = JSON.parse(raw);
            allJobs = parsed.jobs || [];
            allInvoices = parsed.invoices || [];
          }
        } catch(e) {}
      }

      // Check in KV jobs
      let matched = allJobs.find(j => 
        (j.tokenNo && j.tokenNo.toUpperCase() === q) || 
        (j.token && j.token.toUpperCase() === q) ||
        (j.id && j.id.toUpperCase() === q) || 
        (cleanPhone.length >= 10 && (j.customerPhone || '').replace(/[^0-9]/g, '').includes(cleanPhone))
      );

      // Check in KV invoices
      if (!matched) {
        const matchedInv = allInvoices.find(inv => 
          (inv.billNo && inv.billNo.toUpperCase() === q) || 
          (inv.invoiceNo && inv.invoiceNo.toUpperCase() === q) ||
          (inv.id && inv.id.toUpperCase() === q) || 
          (cleanPhone.length >= 10 && (inv.customerPhone || '').replace(/[^0-9]/g, '').includes(cleanPhone))
        );
        if (matchedInv) {
          const firstItem = matchedInv.items && matchedInv.items[0] ? matchedInv.items[0] : null;
          matched = {
            token: matchedInv.billNo || matchedInv.invoiceNo || matchedInv.id,
            tokenNo: matchedInv.billNo || matchedInv.invoiceNo || matchedInv.id,
            customerName: matchedInv.customerName,
            customerPhone: matchedInv.customerPhone,
            brand: 'स्मार्टफोन',
            model: firstItem ? (firstItem.name || firstItem.item) : 'रिपेयर पार्ट्स व सर्विस',
            problem: 'काउंटर बिल / रिपेयर पार्ट्स व सर्विस (POS Invoice)',
            estCost: matchedInv.total || matchedInv.totalAmount || 0,
            finalCost: matchedInv.net || matchedInv.totalAmount || 0,
            paid: matchedInv.paid || matchedInv.paidAmount || 0,
            due: matchedInv.due || matchedInv.dueAmount || 0,
            status: (matchedInv.due || matchedInv.dueAmount || 0) > 0 ? 'in-progress' : 'ready',
            branchName: matchedInv.branchName || 'हजरतगंज (मुख्य लैब)'
          };
        }
      }

      // If still not found, check D1 Database directly
      if (!matched && env.DB) {
        try {
          const dbJob = await env.DB.prepare(`
            SELECT * FROM repair_jobs 
            WHERE upper(token_no) = ? OR upper(id) = ? OR (length(?) >= 10 AND customer_phone LIKE ?)
            LIMIT 1
          `).bind(q, q, cleanPhone, `%${cleanPhone}%`).first();

          if (dbJob) {
            matched = {
              token: dbJob.token_no,
              tokenNo: dbJob.token_no,
              customerName: dbJob.customer_name,
              customerPhone: dbJob.customer_phone,
              brand: dbJob.brand,
              model: dbJob.model,
              problem: dbJob.problem,
              estCost: dbJob.est_cost,
              finalCost: dbJob.final_cost,
              status: dbJob.status,
              branchName: dbJob.branch_name,
              receivedByName: dbJob.received_by_name,
              receivedAt: dbJob.received_at,
              assignedTo: dbJob.assigned_to,
              assignedByName: dbJob.assigned_by_name,
              assignedAt: dbJob.assigned_at,
              scheduledAt: dbJob.scheduled_at,
              workInstructions: dbJob.work_instructions,
              estimatedMins: dbJob.estimated_mins,
              startedAt: dbJob.started_at,
              completedAt: dbJob.completed_at,
              actualDurationMins: dbJob.actual_duration_mins
            };
          } else {
            const dbInv = await env.DB.prepare(`
              SELECT * FROM invoices 
              WHERE upper(bill_no) = ? OR upper(id) = ? OR (length(?) >= 10 AND customer_phone LIKE ?)
              LIMIT 1
            `).bind(q, q, cleanPhone, `%${cleanPhone}%`).first();

            if (dbInv) {
              let items = [];
              try { items = JSON.parse(dbInv.items); } catch(e) {}
              const firstItem = items && items[0] ? items[0] : null;
              matched = {
                token: dbInv.bill_no || dbInv.id,
                tokenNo: dbInv.bill_no || dbInv.id,
                customerName: dbInv.customer_name,
                customerPhone: dbInv.customer_phone,
                brand: 'स्मार्टफोन',
                model: firstItem ? (firstItem.name || firstItem.item) : 'रिपेयर पार्ट्स व सर्विस',
                problem: 'काउंटर बिल / रिपेयर पार्ट्स व सर्विस (POS Invoice)',
                estCost: dbInv.total,
                finalCost: dbInv.net,
                paid: dbInv.paid,
                due: dbInv.due,
                status: dbInv.due > 0 ? 'in-progress' : 'ready',
                branchName: dbInv.branch_name || 'हजरतगंज (मुख्य लैब)'
              };
            }
          }
        } catch(d1Err) { console.warn("D1 track query error:", d1Err.message); }
      }

      // If still not found, check standard verified demo lookup (ensures public demo buttons always respond instantly)
      if (!matched) {
        const DEMO_LOOKUP = {};

        if (DEMO_LOOKUP[q]) {
          matched = DEMO_LOOKUP[q];
        } else if (cleanPhone === "9876501234") { matched = DEMO_LOOKUP["MMS-JOB-201"]; } else if (cleanPhone === "9876505678") { matched = DEMO_LOOKUP["MMS-JOB-202"]; } else if (cleanPhone === "9876509012") { matched = DEMO_LOOKUP["MMS-JOB-203"]; } else if (cleanPhone === "9876543210") {
          matched = DEMO_LOOKUP["MMS-1001"];
        } else if (cleanPhone === "9839012345") {
          matched = DEMO_LOOKUP["MMS-1002"];
        } else if (cleanPhone === "9450987654") {
          matched = DEMO_LOOKUP["MMS-1003"];
        }
      }

      if (matched) {
        return jsonResponse({ success: true, found: true, job: matched });
      } else {
        return jsonResponse({ success: true, found: false });
      }
    }

    // 3. Storage Metrics: /api/storage-metrics
    if (url.pathname === "/api/storage-metrics") {
      try {
        let totalAttendance = 0;
        let totalInvoices = 0;
        let totalJobs = 0;
        let totalExpenses = 0;
        let oldRecordsCount = 0;

        const twoMonthsAgoDate = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        if (env.DB) {
          try {
            const [attC, invC, jobC, expC, oldAttC] = await Promise.all([
              env.DB.prepare("SELECT count(*) as c FROM attendance").first(),
              env.DB.prepare("SELECT count(*) as c FROM invoices").first(),
              env.DB.prepare("SELECT count(*) as c FROM repair_jobs").first(),
              env.DB.prepare("SELECT count(*) as c FROM expenses").first(),
              env.DB.prepare("SELECT count(*) as c FROM attendance WHERE date < ?").bind(twoMonthsAgoDate).first()
            ]);
            totalAttendance = attC ? attC.c : 0;
            totalInvoices = invC ? invC.c : 0;
            totalJobs = jobC ? jobC.c : 0;
            totalExpenses = expC ? expC.c : 0;
            oldRecordsCount = oldAttC ? oldAttC.c : 0;
          } catch(e) { console.warn("Metrics DB query error:", e.message); }
        }

        // Estimate size in MB (Approx 15KB per photo attendance, 1KB per invoice/job)
        const dbUsedMB = Number(((totalAttendance * 0.005 + totalInvoices * 0.002 + totalJobs * 0.002 + totalExpenses * 0.001) + 0.1).toFixed(2));
        const mediaUsedMB = Number(((totalAttendance * 0.015) + 0.05).toFixed(2));
        const dbMaxMB = 4500; // 4.5 GB safety threshold
        const mediaMaxMB = 9500; // 9.5 GB safety threshold

        const dbPercent = Number(((dbUsedMB / dbMaxMB) * 100).toFixed(1));
        const mediaPercent = Number(((mediaUsedMB / mediaMaxMB) * 100).toFixed(1));
        const isAlert = dbUsedMB >= 4000 || mediaUsedMB >= 8500 || oldRecordsCount > 0;

        return jsonResponse({
          success: true,
          metrics: {
            dbUsedMB,
            dbMaxMB,
            dbPercent,
            mediaUsedMB,
            mediaMaxMB,
            mediaPercent,
            totalAttendance,
            totalInvoices,
            totalJobs,
            totalExpenses,
            oldRecordsCount,
            twoMonthsAgoDate,
            isAlert
          }
        });
      } catch (err) {
        return jsonResponse({ success: false, error: err.message }, 500);
      }
    }

    // 3. Purge 2-month old data: /api/purge-old-data
    if (url.pathname === "/api/purge-old-data" && request.method === "POST") {
      try {
        const body = await request.json().catch(() => ({}));
        const cutoffDate = body.cutoffDate || new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        let deletedAttendance = 0;
        let deletedJobs = 0;

        if (env.DB) {
          try {
            // Delete attendance records older than 60 days
            const delAtt = await env.DB.prepare("DELETE FROM attendance WHERE date < ?").bind(cutoffDate).run();
            deletedAttendance = delAtt.meta && delAtt.meta.changes ? delAtt.meta.changes : 0;

            // Delete delivered jobs older than 60 days
            const delJob = await env.DB.prepare("DELETE FROM repair_jobs WHERE status = 'delivered' AND created_at < ?").bind(cutoffDate).run();
            deletedJobs = delJob.meta && delJob.meta.changes ? delJob.meta.changes : 0;
          } catch(e) { console.warn("Purge DB error:", e.message); }
        }

        // Update KV Cache if available
        if (env.KV) {
          try {
            const raw = await env.KV.get("monu_master_sync");
            if (raw) {
              const current = JSON.parse(raw);
              if (current.attendance) {
                current.attendance = current.attendance.filter(a => (a.date || '') >= cutoffDate);
              }
              if (current.jobs) {
                current.jobs = current.jobs.filter(j => !(j.status === 'delivered' && (j.createdAt || '') < cutoffDate));
              }
              await env.KV.put("monu_master_sync", JSON.stringify(current));
            }
          } catch(e) { console.warn("Purge KV error:", e.message); }
        }

        return jsonResponse({
          success: true,
          message: `सफलतापूर्वक डेटा क्लीन किया गया: ${deletedAttendance} पुरानी अटेंडेंस और ${deletedJobs} पुराने जॉब्स हटाए गए।`,
          deletedAttendance,
          deletedJobs,
          cutoffDate
        });
      } catch (err) {
        return jsonResponse({ success: false, error: err.message }, 500);
      }
    }

    // 4. Data sync: /api/sync
    if (url.pathname === "/api/sync") {
      if (request.method === "GET") {
        try {
          let store = null;
          if (env.KV) {
            const raw = await env.KV.get("monu_master_sync");
            if (raw) {
              try { store = JSON.parse(raw); } catch(e) {}
            }
          }

          if (store && (store.attendance || store.invoices || store.jobs || store.expenses || store.staff)) {
            if (Array.isArray(store.invoices)) {
              store.invoices = store.invoices.map(inv => {
                const bNo = inv.billNo || inv.invoiceNo || inv.id;
                const tot = Number(inv.total ?? inv.totalAmount ?? inv.net ?? 0);
                const pd = Number(inv.paid ?? inv.paidAmount ?? 0);
                const du = Number(inv.due ?? inv.dueAmount ?? 0);
                return {
                  ...inv,
                  billNo: bNo,
                  invoiceNo: bNo,
                  total: tot,
                  totalAmount: tot,
                  paid: pd,
                  paidAmount: pd,
                  due: du,
                  dueAmount: du,
                  items: Array.isArray(inv.items) ? inv.items : []
                };
              });
            }
            if (store && store.attendance && Array.isArray(store.attendance)) {
              const cutoffDateStr = new Date(Date.now() - 15 * 86400000).toISOString().split('T')[0];
              store.attendance.forEach(rec => {
                if (rec.date && rec.date < cutoffDateStr && (rec.photo || rec.selfie)) {
                  rec.photo = null;
                  rec.selfie = null;
                  rec.purged = true;
                }
              });
            }
            if (store && store.inventory && Array.isArray(store.inventory)) {
              store.inventory.forEach(i => {
                if (i.branchId === 'branch_kannauj') i.branchId = 'branch_hazratganj';
              });
            }
            if (Array.isArray(store.contacts)) {
              const D_PHONES = ['9933445566', '9887766554', '9123456789', '9455667788', '9723338321', '9911223344', '9876543210'];
              const D_NAMES = ['संजय', 'Sanjay', 'राजू', 'Raju', 'अमन', 'Aman', 'मोबाइल हब', 'Mobile Hub', 'अरविंद', 'Arvind', 'अमित', 'Amit'];
              store.contacts = store.contacts.filter(c => {
                if (!c) return false;
                const p = String(c.phone || '');
                const n = String(c.name || '');
                if (D_PHONES.some(dp => p.includes(dp))) return false;
                if (D_NAMES.some(dn => n.includes(dn))) return false;
                return true;
              });
            }
            return jsonResponse({
              success: true,
              source: "enterprise_cache",
              version: "11.0",
              build: "20261118_116",
              timestamp: new Date().toISOString(),
              data: store
            });
          }

          if (env.DB) {
            const cutoffDateStr = new Date(Date.now() - 15 * 86400000).toISOString().split('T')[0];
            const [attRows, invRows, jobRows, expRows] = await Promise.all([
              env.DB.prepare("SELECT * FROM attendance ORDER BY created_at DESC LIMIT 1000").all(),
              env.DB.prepare("SELECT * FROM invoices ORDER BY created_at DESC LIMIT 100").all(),
              env.DB.prepare("SELECT * FROM repair_jobs ORDER BY updated_at DESC LIMIT 100").all(),
              env.DB.prepare("SELECT * FROM expenses ORDER BY created_at DESC LIMIT 100").all()
            ]);

            const attendance = (attRows.results || []).map(r => ({
              id: r.id, empId: r.emp_id, empName: r.emp_name, branchId: r.branch_id, branchName: r.branch_name,
              date: r.date, inTime: r.in_time, outTime: r.out_time, duration: r.duration, status: r.status,
              lat: r.lat, lng: r.lng, distance: r.distance,
              photo: (r.date && r.date < cutoffDateStr) ? null : r.photo,
              selfie: (r.date && r.date < cutoffDateStr) ? null : r.photo,
              purged: !!(r.date && r.date < cutoffDateStr),
              createdAt: r.created_at
            }));

            const invoices = (invRows.results || []).map(r => {
              let items = [];
              try { items = typeof r.items === 'string' ? JSON.parse(r.items) : (r.items || []); } catch(e) {}
              if (!Array.isArray(items)) items = [];
              const bNo = r.bill_no || r.invoice_no || r.id;
              const tot = Number(r.total ?? r.net ?? 0);
              const pd = Number(r.paid ?? 0);
              const du = Number(r.due ?? 0);
              return {
                id: r.id, 
                billNo: bNo, 
                invoiceNo: bNo,
                customerName: r.customer_name || 'Walk-in Customer', 
                customerPhone: r.customer_phone || '',
                customerType: r.customer_type || 'customer', 
                branchId: r.branch_id || 'branch_hazratganj', 
                branchName: r.branch_name || '', 
                date: r.date || '',
                items, 
                total: tot, 
                totalAmount: tot,
                discount: Number(r.discount ?? 0), 
                net: tot, 
                paid: pd, 
                paidAmount: pd,
                due: du, 
                dueAmount: du,
                paymentMode: r.payment_mode || 'Cash', 
                createdAt: r.created_at
              };
            });

            const jobs = (jobRows.results || []).map(r => ({
              id: r.id, tokenNo: r.token_no, customerName: r.customer_name, customerPhone: r.customer_phone,
              brand: r.brand, model: r.model, problem: r.problem, estCost: r.est_cost, finalCost: r.final_cost,
              status: r.status, branchId: r.branch_id, branchName: r.branch_name, assignedTo: r.assigned_to,
              createdAt: r.created_at, updatedAt: r.updated_at
            }));

            const expenses = (expRows.results || []).map(r => ({
              id: r.id, branchId: r.branch_id, category: r.category, title: r.title, amount: r.amount,
              paidTo: r.paid_to, paymentMode: r.payment_mode, date: r.date, createdAt: r.created_at
            }));

            let fullData = { attendance, invoices, jobs, expenses };
            if (env.KV) {
              const cached = await env.KV.get("monu_master_sync");
              if (cached) {
                try {
                  const parsed = JSON.parse(cached);
                  fullData = { ...parsed, ...fullData };
                } catch(e) {}
              }
              await env.KV.put("monu_master_sync", JSON.stringify(fullData));
            }

            if (Array.isArray(fullData.contacts)) {
              const D_PHONES = ['9933445566', '9887766554', '9123456789', '9455667788', '9723338321', '9911223344', '9876543210'];
              const D_NAMES = ['संजय', 'Sanjay', 'राजू', 'Raju', 'अमन', 'Aman', 'मोबाइल हब', 'Mobile Hub', 'अरविंद', 'Arvind', 'अमित', 'Amit'];
              fullData.contacts = fullData.contacts.filter(c => {
                if (!c) return false;
                const p = String(c.phone || '');
                const n = String(c.name || '');
                if (D_PHONES.some(dp => p.includes(dp))) return false;
                if (D_NAMES.some(dn => n.includes(dn))) return false;
                return true;
              });
            }

            return jsonResponse({
              success: true,
              source: "enterprise_db",
              version: "11.0",
              build: "20261118_116",
              timestamp: new Date().toISOString(),
              data: fullData
            });
          }

          return jsonResponse({
            success: true,
            source: "local_ready",
            data: { attendance: [], invoices: [], jobs: [], expenses: [] }
          });
        } catch (err) {
          console.warn("Read sync fallback:", err.message);
          return jsonResponse({
            success: true,
            source: "safe_standby",
            data: { attendance: [], invoices: [], jobs: [], expenses: [] }
          });
        }
      }

      if (request.method === "POST") {
        try {
          const payload = await request.json();
          const { action } = payload;

          let currentKv = { attendance: [], invoices: [], jobs: [], expenses: [] };
          if (env.KV) {
            const raw = await env.KV.get("monu_master_sync");
            if (raw) {
              try { currentKv = JSON.parse(raw); } catch(e) {}
            }
          }

          
          if (action === 'sync_master_state') {
            const data = payload.data || {};
            if (env.KV) {
              if (Array.isArray(data.inventory)) {
                data.inventory.forEach(i => {
                  if (i.branchId === 'branch_kannauj') i.branchId = 'branch_hazratganj';
                });
                currentKv.inventory = data.inventory;
              }
              if (Array.isArray(data.invoices)) currentKv.invoices = data.invoices.slice(0, 200);
              if (Array.isArray(data.jobs)) currentKv.jobs = data.jobs.slice(0, 200);
              if (Array.isArray(data.expenses)) currentKv.expenses = data.expenses.slice(0, 200);
              if (Array.isArray(data.attendance)) {
                currentKv.attendance = data.attendance.slice(0, 1000);
                if (env.DB && currentKv.attendance.length > 0) {
                  try {
                    const stmts = currentKv.attendance.slice(0, 100).map(a => {
                      const id = a.id || `att_${a.empId}_${(a.date||'').replace(/-/g,'')}`;
                      return env.DB.prepare(`
                        INSERT INTO attendance (id, emp_id, emp_name, branch_id, branch_name, date, in_time, out_time, duration, status, lat, lng, distance, photo)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        ON CONFLICT(id) DO UPDATE SET
                          out_time = excluded.out_time,
                          duration = excluded.duration,
                          status = excluded.status
                      `).bind(
                        id, a.empId, a.empName || a.employeeName || 'Staff', a.branchId || 'branch_hazratganj',
                        a.branchName || '', a.date || '', a.inTime || '—', a.outTime || '—', a.duration || '',
                        a.status || 'approved', a.lat || 26.8501, a.lng || 80.9483, a.distance || a.distanceMeters || 15,
                        null
                      );
                    });
                    await env.DB.batch(stmts);
                  } catch(e) { console.warn("D1 batch err:", e.message); }
                }
              }
              if (Array.isArray(data.advances)) currentKv.advances = data.advances.slice(0, 200);
              if (Array.isArray(data.staff)) currentKv.staff = data.staff;
              if (Array.isArray(data.contacts)) currentKv.contacts = data.contacts.slice(0, 300);
              if (Array.isArray(data.stockTransfers)) currentKv.transfers = data.stockTransfers.slice(0, 100);

              await env.KV.put("monu_master_sync", JSON.stringify(currentKv));
            }
            return jsonResponse({ success: true, message: "Master state synced directly to Enterprise Cloud" });
          }

          if (action === 'delete_invoice') {
            const { id } = payload;
            if (id) {
              if (env.KV && currentKv.invoices) {
                currentKv.invoices = currentKv.invoices.filter(i => i.id !== id && i.invoiceNo !== id && i.billNo !== id);
                await env.KV.put("monu_master_sync", JSON.stringify(currentKv));
              }
              if (env.DB) {
                try {
                  await env.DB.prepare("DELETE FROM invoices WHERE id = ? OR bill_no = ?").bind(id, id).run();
                } catch(e) {}
              }
              return jsonResponse({ success: true, message: "Invoice deleted from cloud" });
            }
            return jsonResponse({ success: false, error: "Missing invoice id" }, 400);
          }

          if (action === 'delete_job') {
            const { id } = payload;
            if (id) {
              if (env.KV && currentKv.jobs) {
                currentKv.jobs = currentKv.jobs.filter(j => j.id !== id && j.token !== id && j.tokenNo !== id);
                await env.KV.put("monu_master_sync", JSON.stringify(currentKv));
              }
              if (env.DB) {
                try {
                  await env.DB.prepare("DELETE FROM repair_jobs WHERE id = ? OR token_no = ?").bind(id, id).run();
                } catch(e) {}
              }
              return jsonResponse({ success: true, message: "Job deleted from cloud" });
            }
            return jsonResponse({ success: false, error: "Missing job id" }, 400);
          }

          if (action === 'delete_expense') {
            const { id } = payload;
            if (id) {
              if (env.KV && currentKv.expenses) {
                currentKv.expenses = currentKv.expenses.filter(e => e.id !== id);
                await env.KV.put("monu_master_sync", JSON.stringify(currentKv));
              }
              if (env.DB) {
                try {
                  await env.DB.prepare("DELETE FROM expenses WHERE id = ?").bind(id).run();
                } catch(e) {}
              }
              return jsonResponse({ success: true, message: "Expense deleted from cloud" });
            }
            return jsonResponse({ success: false, error: "Missing expense id" }, 400);
          }

          if (action === 'sync_advances') {
            const advancesList = payload.advances || payload.data;
            if (Array.isArray(advancesList) && env.KV) {
              currentKv.advances = advancesList;
              await env.KV.put("monu_master_sync", JSON.stringify(currentKv));
              return jsonResponse({ success: true, message: "Advances synced to cloud" });
            }
          }

          if (action === 'sync_transfers') {
            const trfList = payload.transfers || payload.data;
            if (Array.isArray(trfList) && env.KV) {
              currentKv.transfers = trfList;
              await env.KV.put("monu_master_sync", JSON.stringify(currentKv));
              return jsonResponse({ success: true, message: "Transfers synced to cloud" });
            }
          }

          if (action === 'sync_contacts') {
            const contactsList = payload.contacts || payload.data;
            if (Array.isArray(contactsList) && env.KV) {
              currentKv.contacts = contactsList;
              await env.KV.put("monu_master_sync", JSON.stringify(currentKv));
              return jsonResponse({ success: true, message: "Contacts synced to cloud" });
            }
          }

          if (action === 'bind_device') {
            const { empId, deviceToken, deviceModel } = payload;
            if (!empId || !deviceToken) return jsonResponse({ success: false, error: "empId and deviceToken required" }, 400);
            
            let boundSuccess = true;
            let lockedToOther = false;
            let existingToken = null;

            if (env.DB) {
              try {
                const emp = await env.DB.prepare("SELECT * FROM employees WHERE id = ? OR phone = ?").bind(empId, empId).first();
                if (emp) {
                  if (emp.device_token && emp.device_token !== deviceToken) {
                    lockedToOther = true;
                    existingToken = emp.device_token;
                  } else {
                    await env.DB.prepare("UPDATE employees SET device_token = ?, device_model = ?, device_locked_at = CURRENT_TIMESTAMP WHERE id = ?").bind(deviceToken, deviceModel || 'Mobile Device', emp.id).run();
                  }
                }
              } catch(e) { console.warn("bind_device db err:", e.message); }
            }

            if (lockedToOther) {
              return jsonResponse({ success: false, locked: true, error: "🚫 यह अकाउंट पहले से दूसरे फोन से लॉक है। कृपया एडमिन से डिवाइस लॉक रीसेट करवाएं।" }, 403);
            }

            return jsonResponse({ success: true, bound: true, message: "डिवाइस सफलतापूर्वक लॉक हो गया।" });
          }

          if (action === 'reset_device_lock') {
            const { empId, adminPhone } = payload;
            if (!empId) return jsonResponse({ success: false, error: "empId required" }, 400);

            if (env.DB) {
              try {
                await env.DB.prepare("UPDATE employees SET device_token = NULL, device_model = NULL, device_locked_at = NULL WHERE id = ? OR phone = ?").bind(empId, empId).run();
              } catch(e) { console.warn("reset_device_lock db err:", e.message); }
            }

            return jsonResponse({ success: true, message: "डिवाइस लॉक सफलतापूर्वक रीसेट कर दिया गया।" });
          }

          if (action === 'assign_work') {
            const assignment = payload.assignment || payload.data;
            if (!assignment || !assignment.token) return jsonResponse({ success: false, error: "Missing assignment data" }, 400);

            const token = assignment.token;
            const assignedTo = assignment.assignedTo || '';
            const assignedByName = assignment.assignedByName || 'Admin';
            const assignedAt = assignment.assignedAt || new Date().toISOString();
            const scheduledAt = assignment.scheduledAt || null;
            const workInstructions = assignment.workInstructions || '';
            const estimatedMins = Number(assignment.estimatedMins) || 45;
            const receivedByName = assignment.receivedByName || assignedByName;
            const receivedAt = assignment.receivedAt || assignedAt;

            if (env.DB) {
              try {
                await env.DB.prepare(`
                  UPDATE repair_jobs SET 
                    assigned_to = ?,
                    assigned_by_name = ?,
                    assigned_at = ?,
                    scheduled_at = ?,
                    work_instructions = ?,
                    estimated_mins = ?,
                    received_by_name = COALESCE(received_by_name, ?),
                    received_at = COALESCE(received_at, ?),
                    updated_at = CURRENT_TIMESTAMP
                  WHERE upper(token_no) = upper(?) OR upper(id) = upper(?)
                `).bind(
                  assignedTo, assignedByName, assignedAt, scheduledAt, workInstructions,
                  estimatedMins, receivedByName, receivedAt, token, token
                ).run();
              } catch(e) { console.warn("assign_work db err:", e.message); }
            }

            if (env.KV) {
              const jobList = currentKv.jobs || [];
              const idx = jobList.findIndex(j => (j.token && j.token.toUpperCase() === token.toUpperCase()) || (j.tokenNo && j.tokenNo.toUpperCase() === token.toUpperCase()));
              if (idx >= 0) {
                jobList[idx] = {
                  ...jobList[idx],
                  assignedTo,
                  assignedByName,
                  assignedAt,
                  scheduledAt,
                  workInstructions,
                  estimatedMins,
                  receivedByName: jobList[idx].receivedByName || receivedByName,
                  receivedAt: jobList[idx].receivedAt || receivedAt
                };
                currentKv.jobs = jobList;
                await env.KV.put("monu_master_sync", JSON.stringify(currentKv));
              }
            }

            return jsonResponse({ success: true, message: "काम सफलतापूर्वक असाइन हो गया।" });
          }

          if (action === 'update_job_step') {
            const { token, step, timestamp, completedAt, actualDurationMins } = payload;
            if (!token || !step) return jsonResponse({ success: false, error: "token and step required" }, 400);

            let newStatus = 'in-progress';
            if (step === 'start_work') newStatus = 'in-progress';
            if (step === 'finish_work') newStatus = 'ready';

            if (env.DB) {
              try {
                if (step === 'start_work') {
                  await env.DB.prepare(`
                    UPDATE repair_jobs SET 
                      started_at = ?,
                      status = 'in-progress',
                      updated_at = CURRENT_TIMESTAMP
                    WHERE upper(token_no) = upper(?) OR upper(id) = upper(?)
                  `).bind(timestamp || new Date().toISOString(), token, token).run();
                } else if (step === 'finish_work') {
                  await env.DB.prepare(`
                    UPDATE repair_jobs SET 
                      completed_at = ?,
                      actual_duration_mins = ?,
                      status = 'ready',
                      updated_at = CURRENT_TIMESTAMP
                    WHERE upper(token_no) = upper(?) OR upper(id) = upper(?)
                  `).bind(completedAt || new Date().toISOString(), Number(actualDurationMins) || 0, token, token).run();
                }
              } catch(e) { console.warn("update_job_step db err:", e.message); }
            }

            if (env.KV) {
              const jobList = currentKv.jobs || [];
              const idx = jobList.findIndex(j => (j.token && j.token.toUpperCase() === token.toUpperCase()) || (j.tokenNo && j.tokenNo.toUpperCase() === token.toUpperCase()));
              if (idx >= 0) {
                if (step === 'start_work') {
                  jobList[idx].startedAt = timestamp || new Date().toISOString();
                  jobList[idx].status = 'in-progress';
                } else if (step === 'finish_work') {
                  jobList[idx].completedAt = completedAt || new Date().toISOString();
                  jobList[idx].actualDurationMins = Number(actualDurationMins) || 0;
                  jobList[idx].status = 'ready';
                }
                currentKv.jobs = jobList;
                await env.KV.put("monu_master_sync", JSON.stringify(currentKv));
              }
            }

            return jsonResponse({ success: true, status: newStatus, message: "जॉब स्टेटस अपडेट हुआ।" });
          }

          if (action === 'save_attendance') {
            const a = payload.record || payload.data;
            if (!a || !a.empId) return jsonResponse({ success: false, error: "Invalid record" }, 400);

            const id = a.id || `att_${Date.now()}`;
            const photoVal = a.photo || a.selfie || null;
            const cutoffDateStr = new Date(Date.now() - 15 * 86400000).toISOString().split('T')[0];

            if (env.DB) {
              try {
                await env.DB.prepare(`
                  INSERT INTO attendance (id, emp_id, emp_name, branch_id, branch_name, date, in_time, out_time, duration, status, lat, lng, distance, photo)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                  ON CONFLICT(id) DO UPDATE SET
                    out_time = excluded.out_time,
                    duration = excluded.duration,
                    status = excluded.status,
                    photo = CASE WHEN excluded.photo IS NOT NULL AND excluded.photo != '' THEN excluded.photo ELSE attendance.photo END
                `).bind(
                  id, a.empId, a.empName || a.employeeName || 'Staff', a.branchId || 'branch_hazratganj',
                  a.branchName || '', a.date || new Date().toISOString().split('T')[0], a.inTime || '', a.outTime || '',
                  Number(a.duration) || 0, a.status || 'on-time', Number(a.lat) || 0, Number(a.lng) || 0,
                  Number(a.distance) || 0, photoVal
                ).run();

                // Auto-purge D1 photos older than 15 days
                await env.DB.prepare("UPDATE attendance SET photo = NULL WHERE date < ?").bind(cutoffDateStr).run();
              } catch(dbErr) { console.warn("save_attendance db error:", dbErr.message); }
            }

            if (env.KV) {
              const attList = currentKv.attendance || [];
              const idx = attList.findIndex(item => item.id === id);
              const saveItem = { ...a, id, photo: photoVal, selfie: photoVal };
              if (idx >= 0) attList[idx] = { ...attList[idx], ...saveItem };
              else attList.unshift(saveItem);

              // 15-Day Auto-Purge: Clean old photos
              attList.forEach(rec => {
                if (rec.date && rec.date < cutoffDateStr && (rec.photo || rec.selfie)) {
                  rec.photo = null;
                  rec.selfie = null;
                  rec.purged = true;
                }
              });

              currentKv.attendance = attList.slice(0, 150);
              await env.KV.put("monu_master_sync", JSON.stringify(currentKv));
            }

            return jsonResponse({ success: true, id, message: "Saved to Enterprise Cloud" });
          }

          if (action === 'save_invoice') {
            const inv = payload.invoice || payload.data;
            if (!inv) return jsonResponse({ success: false, error: "Missing invoice" }, 400);

            const id = inv.id || `inv_${Date.now()}`;
            const billNo = inv.billNo || inv.invoiceNo || id;
            const items = Array.isArray(inv.items) ? inv.items : [];
            const total = Number(inv.total ?? inv.totalAmount ?? inv.net ?? 0);
            const discount = Number(inv.discount ?? 0);
            const net = Number(inv.net ?? inv.totalAmount ?? inv.total ?? 0);
            const paid = Number(inv.paid ?? inv.paidAmount ?? 0);
            const due = Number(inv.due ?? inv.dueAmount ?? 0);
            const paymentMode = inv.paymentMode || 'Cash';

            const normalizedInvoice = {
              ...inv,
              id,
              billNo,
              invoiceNo: billNo,
              items,
              total,
              totalAmount: total,
              discount,
              net,
              paid,
              paidAmount: paid,
              due,
              dueAmount: due,
              paymentMode
            };

            if (env.DB) {
              try {
                await env.DB.prepare(`
                  INSERT INTO invoices (id, bill_no, customer_name, customer_phone, customer_type, branch_id, branch_name, date, items, total, discount, net, paid, due, payment_mode)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                  ON CONFLICT(id) DO UPDATE SET 
                    bill_no = excluded.bill_no,
                    customer_name = excluded.customer_name,
                    customer_phone = excluded.customer_phone,
                    items = excluded.items,
                    total = excluded.total,
                    discount = excluded.discount,
                    net = excluded.net,
                    paid = excluded.paid,
                    due = excluded.due,
                    payment_mode = excluded.payment_mode
                `).bind(
                  id, billNo, inv.customerName || 'Walk-in', inv.customerPhone || '', inv.customerType || 'retail',
                  inv.branchId || 'branch_hazratganj', inv.branchName || '', inv.date || new Date().toISOString().split('T')[0],
                  JSON.stringify(items), total, discount, net, paid, due, paymentMode
                ).run();
              } catch(dbErr) { console.warn("save_invoice db error:", dbErr.message); }
            }

            if (env.KV) {
              const invList = currentKv.invoices || [];
              const idx = invList.findIndex(item => item.id === id || (item.invoiceNo && item.invoiceNo === billNo) || (item.billNo && item.billNo === billNo));
              if (idx >= 0) invList[idx] = { ...invList[idx], ...normalizedInvoice };
              else invList.unshift(normalizedInvoice);
              currentKv.invoices = invList.slice(0, 150);
              await env.KV.put("monu_master_sync", JSON.stringify(currentKv));
            }

            return jsonResponse({ success: true, id, message: "Saved to Enterprise Cloud" });
          }

          if (action === 'save_job') {
            const job = payload.job || payload.data;
            if (!job) return jsonResponse({ success: false, error: "Missing job" }, 400);

            const id = job.id || `job_${Date.now()}`;
            if (env.DB) {
              try {
                await env.DB.prepare(`
                  INSERT INTO repair_jobs (id, token_no, customer_name, customer_phone, brand, model, problem, est_cost, final_cost, status, branch_id, branch_name, assigned_to, updated_at)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
                  ON CONFLICT(id) DO UPDATE SET final_cost = excluded.final_cost, status = excluded.status, assigned_to = excluded.assigned_to, updated_at = CURRENT_TIMESTAMP
                `).bind(
                  id, job.tokenNo || id, job.customerName || '', job.customerPhone || '', job.brand || '', job.model || '',
                  job.problem || '', Number(job.estCost) || 0, Number(job.finalCost) || 0, job.status || 'received',
                  job.branchId || 'branch_hazratganj', job.branchName || '', job.assignedTo || ''
                ).run();
              } catch(dbErr) { console.warn("save_job db error:", dbErr.message); }
            }

            if (env.KV) {
              const jobList = currentKv.jobs || [];
              const idx = jobList.findIndex(item => item.id === id);
              if (idx >= 0) jobList[idx] = { ...jobList[idx], ...job, id };
              else jobList.unshift({ ...job, id });
              currentKv.jobs = jobList.slice(0, 150);
              await env.KV.put("monu_master_sync", JSON.stringify(currentKv));
            }

            return jsonResponse({ success: true, id, message: "Saved to Enterprise Cloud" });
          }

          if (action === 'save_expense') {
            const exp = payload.expense || payload.data;
            if (!exp) return jsonResponse({ success: false, error: "Missing expense" }, 400);

            const id = exp.id || `exp_${Date.now()}`;
            if (env.DB) {
              try {
                await env.DB.prepare(`
                  INSERT INTO expenses (id, branch_id, category, title, amount, paid_to, payment_mode, date)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                  ON CONFLICT(id) DO UPDATE SET amount = excluded.amount, paid_to = excluded.paid_to
                `).bind(
                  id, exp.branchId || 'branch_hazratganj', exp.category || 'General', exp.title || '',
                  Number(exp.amount) || 0, exp.paidTo || '', exp.paymentMode || 'cash', exp.date || new Date().toISOString().split('T')[0]
                ).run();
              } catch(dbErr) { console.warn("save_expense db error:", dbErr.message); }
            }

            if (env.KV) {
              const expList = currentKv.expenses || [];
              const idx = expList.findIndex(item => item.id === id);
              if (idx >= 0) expList[idx] = { ...expList[idx], ...exp, id };
              else expList.unshift({ ...exp, id });
              currentKv.expenses = expList.slice(0, 150);
              await env.KV.put("monu_master_sync", JSON.stringify(currentKv));
            }

            return jsonResponse({ success: true, id, message: "Saved to Enterprise Cloud" });
          }

          
          if (action === 'sync_inventory') {
            const invList = payload.inventory || payload.data;
            if (Array.isArray(invList) && invList.length > 0) {
              invList.forEach(i => {
                if (i.branchId === 'branch_kannauj') i.branchId = 'branch_hazratganj';
              });
              if (env.KV) {
                currentKv.inventory = invList;
                await env.KV.put("monu_master_sync", JSON.stringify(currentKv));
              }
              if (env.DB) {
                try {
                  for (const item of invList.slice(0, 100)) {
                    await env.DB.prepare(`
                      INSERT INTO inventory (id, name, sku, category, cost_price, sell_price, stock, min_alert, branch_id)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                      ON CONFLICT(id) DO UPDATE SET stock = excluded.stock, sell_price = excluded.sell_price, cost_price = excluded.cost_price
                    `).bind(
                      item.sku || item.id, item.name || '', item.sku || '', item.category || '',
                      Number(item.costPrice) || 0, Number(item.sellPrice) || 0, Number(item.stock) || 0,
                      Number(item.minAlert) || 2, item.branchId || 'branch_hazratganj'
                    ).run();
                  }
                } catch(dbErr) { console.warn("sync_inventory db error:", dbErr.message); }
              }
              return jsonResponse({ success: true, count: invList.length, message: "Inventory synchronized to Enterprise Cloud" });
            }
            return jsonResponse({ success: false, error: "Invalid inventory payload" }, 400);
          }

          if (action === 'sync_staff') {
            const staffList = payload.staff || payload.data;
            if (Array.isArray(staffList) && staffList.length > 0) {
              if (env.KV) {
                currentKv.staff = staffList;
                await env.KV.put("monu_master_sync", JSON.stringify(currentKv));
              }
              return jsonResponse({ success: true, count: staffList.length, message: "Staff synchronized to Enterprise Cloud" });
            }
            return jsonResponse({ success: false, error: "Invalid staff payload" }, 400);
          }

          return jsonResponse({ success: false, error: "Unknown action: " + action }, 400);
        } catch (err) {
          return jsonResponse({ success: false, error: err.message }, 500);
        }
      }
    }

    const res = await env.ASSETS.fetch(request);
    const newHeaders = new Headers(res.headers);
    newHeaders.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
    newHeaders.set("Pragma", "no-cache");
    newHeaders.set("Expires", "0");
    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: newHeaders
    });
  }
};
