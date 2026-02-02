using System.Text.Json.Serialization;

namespace Altairis.Api.Models;

public class TipoHabitacion
{
    public int Id { get; set; }
    public int HotelId { get; set; }
    public string Nombre { get; set; } = "";
    public int Capacidad { get; set; }
    public decimal Precio { get; set; }

    [JsonIgnore]
    public Hotel? Hotel { get; set; }

    [JsonIgnore]
    public List<Inventario> Inventarios { get; set; } = new();

    [JsonIgnore]
    public List<Reserva> Reservas { get; set; } = new();
}
