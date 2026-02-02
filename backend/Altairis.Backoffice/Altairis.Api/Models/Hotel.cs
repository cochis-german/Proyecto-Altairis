using System.Text.Json.Serialization;

namespace Altairis.Api.Models;

public class Hotel
{
    public int Id { get; set; }
    public string Nombre { get; set; } = "";
    public string Ciudad { get; set; } = "";
    public string Pais { get; set; } = "";
    public bool Activo { get; set; } = true;

    [JsonIgnore]
    public List<TipoHabitacion> TiposHabitacion { get; set; } = new();

    [JsonIgnore]
    public List<Inventario> Inventarios { get; set; } = new();

    [JsonIgnore]
    public List<Reserva> Reservas { get; set; } = new();
}
