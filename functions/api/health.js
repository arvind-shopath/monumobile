export async function onRequestGet(context) {
  const { env } = context;
  try {
    if (!env.DB) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: "D1 Database binding 'DB' not found in environment." 
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    const result = await env.DB.prepare("SELECT count(*) as total_tables FROM sqlite_master WHERE type='table'").first();

    return new Response(JSON.stringify({
      success: true,
      status: "connected",
      database: "Cloudflare D1 (monumobile-db)",
      tables: result ? result.total_tables : 0,
      timestamp: new Date().toISOString()
    }), {
      headers: { 
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: err.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
