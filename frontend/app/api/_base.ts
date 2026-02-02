export function apiBase() {
  return process.env.API_INTERNAL_BASE || "http://api:8080";
}
