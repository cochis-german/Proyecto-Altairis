// services/api.ts
const API_URL = "http://localhost:8080/api";

export interface Hotel {
  id?: number;
  nombre: string;
  ciudad: string;
  pais: string;
  activo: boolean;
}

// Función para traer hoteles (con o sin búsqueda)
export const fetchHoteles = async (query = ""): Promise<Hotel[]> => {
  const url = query ? `${API_URL}/hoteles?q=${query}` : `${API_URL}/hoteles`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error("Error al obtener hoteles");
  return await response.json();
};

// Función para crear un hotel
export const createHotel = async (hotel: Hotel): Promise<Hotel> => {
  const response = await fetch(`${API_URL}/hoteles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(hotel),
  });
  if (!response.ok) throw new Error("Error al crear hotel");
  return await response.json();
};

// Función para eliminar un hotel
export const deleteHotel = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/hoteles/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar");
};
