export interface Hotel {
  id: number;
  nombre: string;
  ciudad: string;
  pais: string;
  activo: boolean;
}

export interface Cliente {
  id: number;
  nombreCompleto: string;
  email: string;
  documento: string;
}

export interface TipoHabitacion {
  id: number;
  hotelId: number;
  nombre: string;
  capacidad: number;
  precio: number;
}

export interface Reserva {
  id: number;
  hotel: string;
  tipoHabitacion: string;
  cliente: string;
  fechaIngreso: string;
  fechaSalida: string;
  cantidadHabitaciones: number;
  estado: string;
}

export interface Inventario {
  id: number;
  hotelId: number;
  tipoHabitacionId: number;
  tipoHabitacion: string;
  fecha: string;
  unidadesDisponibles: number;
}
