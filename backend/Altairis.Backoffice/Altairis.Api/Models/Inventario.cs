using System.Text.Json.Serialization;

namespace Altairis.Api.Models;

public class Inventario
{
    public int Id { get; set; }
    public int HotelId { get; set; }
    public int TipoHabitacionId { get; set; }
    public DateTime Fecha { get; set; }
    public int UnidadesDisponibles { get; set; }

    [JsonIgnore]
    public Hotel? Hotel { get; set; }

    [JsonIgnore]
    public TipoHabitacion? TipoHabitacion { get; set; }
}
