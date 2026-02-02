using System.Text.Json.Serialization;

namespace Altairis.Api.Models;

public class Reserva
{
    public int Id { get; set; }
    public int HotelId { get; set; }
    public int TipoHabitacionId { get; set; }
    public int ClienteId { get; set; }
    public DateTime FechaIngreso { get; set; }
    public DateTime FechaSalida { get; set; }
    public int CantidadHabitaciones { get; set; }
    public string Estado { get; set; } = "CONFIRMADO";
    public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;

    [JsonIgnore]
    public Hotel? Hotel { get; set; }

    [JsonIgnore]
    public TipoHabitacion? TipoHabitacion { get; set; }

    [JsonIgnore]
    public Cliente? Cliente { get; set; }
}
