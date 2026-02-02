using Altairis.Api.Data;
using Altairis.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Altairis.Api.Controllers;

[ApiController]
[Route("api/reservas")]
public class ReservasController : ControllerBase
{
    private readonly AppDbContext _db;
    public ReservasController(AppDbContext db) { _db = db; }

    [HttpGet]
    public async Task<IActionResult> Listar([FromQuery] int? hotelId, [FromQuery] DateTime? fecha)
    {
        var dia = (fecha ?? DateTime.UtcNow.Date).Date;

        var query = _db.Reservas.AsNoTracking()
            .Where(r => r.FechaIngreso.Date <= dia && r.FechaSalida.Date > dia);

        if (hotelId.HasValue)
            query = query.Where(r => r.HotelId == hotelId.Value);

        var items = await query
            .Join(_db.Hoteles.AsNoTracking(), r => r.HotelId, h => h.Id, (r, h) => new { r, h })
            .Join(_db.TiposHabitacion.AsNoTracking(), x => x.r.TipoHabitacionId, t => t.Id, (x, t) => new { x.r, x.h, t })
            .Join(_db.Clientes.AsNoTracking(), x => x.r.ClienteId, c => c.Id, (x, c) => new
            {
                x.r.Id,
                Hotel = x.h.Nombre,
                TipoHabitacion = x.t.Nombre,
                Cliente = c.NombreCompleto,
                x.r.FechaIngreso,
                x.r.FechaSalida,
                x.r.CantidadHabitaciones,
                x.r.Estado,
                x.r.FechaCreacion
            })
            .OrderByDescending(x => x.FechaCreacion)
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost]
    public async Task<IActionResult> Crear(Reserva input)
    {
        if (input.FechaSalida <= input.FechaIngreso)
            return BadRequest("Fechas inválidas");

        if (input.CantidadHabitaciones < 1)
            return BadRequest("CantidadHabitaciones inválida");

        var entity = new Reserva
        {
            HotelId = input.HotelId,
            TipoHabitacionId = input.TipoHabitacionId,
            ClienteId = input.ClienteId,
            FechaIngreso = input.FechaIngreso.Date,
            FechaSalida = input.FechaSalida.Date,
            CantidadHabitaciones = input.CantidadHabitaciones,
            Estado = string.IsNullOrWhiteSpace(input.Estado)
                ? "CONFIRMADO"
                : input.Estado.Trim().ToUpper()
        };

        _db.Reservas.Add(entity);
        await _db.SaveChangesAsync();

        return Ok(entity);
    }
}