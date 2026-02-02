import { apiBase } from "../_base";

export async function GET() {
  const r = await fetch(`${apiBase()}/api/hoteles`, { cache: "no-store" });
  const text = await r.text();
  return new Response(text, {
    status: r.status,
    headers: { "Content-Type": "application/json" },
  });
}
