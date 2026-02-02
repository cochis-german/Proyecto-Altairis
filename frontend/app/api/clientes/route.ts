import { apiBase } from "../_base";

export async function GET() {
  const r = await fetch(`${apiBase()}/api/clientes`, { cache: "no-store" });
  const t = await r.text();
  return new Response(t, {
    status: r.status,
    headers: { "Content-Type": "application/json" },
  });
}
