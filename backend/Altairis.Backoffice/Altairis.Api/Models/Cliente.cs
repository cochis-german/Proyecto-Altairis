using System.Text.Json.Serialization;

namespace Altairis.Api.Models;

public class Cliente
{
    public int Id { get; set; }
    public string NombreCompleto { get; set; } = "";
    public string Email { get; set; } = "";
    public string Documento { get; set; } = "";

    [JsonIgnore]
    public List<Reserva> Reservas { get; set; } = new();
}
