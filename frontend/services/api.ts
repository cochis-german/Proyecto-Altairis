import {
  Hotel,
  Cliente,
  TipoHabitacion,
  Reserva,
  Inventario,
} from "../app/types";

const API_BASE_URL =
  typeof window === "undefined" ? "http://backend:8080/api" : "/api";

async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Error en la API: ${response.status}`);
  }

  if (response.status === 204) return {} as T;
  return response.json();
}

export const ApiService = {
  // Hoteles
  getHoteles: (q?: string) =>
    apiFetch<Hotel[]>(`/hoteles${q ? `?q=${q}` : ""}`),
  postHotel: (data: Partial<Hotel>) =>
    apiFetch<Hotel>(`/hoteles`, { method: "POST", body: JSON.stringify(data) }),

  // Clientes
  getClientes: (q?: string) =>
    apiFetch<Cliente[]>(`/clientes${q ? `?q=${q}` : ""}`),
  postCliente: (data: Partial<Cliente>) =>
    apiFetch<Cliente>(`/clientes`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Tipos de Habitación
  getTiposHabitacion: (hotelId?: number) =>
    apiFetch<TipoHabitacion[]>(
      `/tipos-habitacion${hotelId ? `?hotelId=${hotelId}` : ""}`,
    ),
  postTipoHabitacion: (data: Partial<TipoHabitacion>) =>
    apiFetch<TipoHabitacion>(`/tipos-habitacion`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Inventario
  getInventario: (hotelId: number) =>
    apiFetch<{ items: Inventario[] }>(`/inventario?hotelId=${hotelId}`),

  // Reservas
  getReservas: () => apiFetch<Reserva[]>("/reservas"),
  postReserva: (data: Partial<Reserva>) =>
    apiFetch<Reserva>("/reservas", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
