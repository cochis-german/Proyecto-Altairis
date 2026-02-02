using Altairis.Api.Data;
using Altairis.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Altairis.Api.Controllers;

[ApiController]
[Route("api/inventario")]
public class InventarioController : ControllerBase
{
    private readonly AppDbContext _db;
    public InventarioController(AppDbContext db) { _db = db; }

    [HttpGet]
    public async Task<IActionResult> Listar(
        [FromQuery] int hotelId,
        [FromQuery] DateTime? desde,
        [FromQuery] DateTime? hasta)
    {
        var inicio = (desde ?? DateTime.UtcNow.Date).Date;
        var fin = (hasta ?? inicio.AddDays(14)).Date;

        var items = await _db.Inventarios.AsNoTracking()
            .Where(i => i.HotelId == hotelId && i.Fecha >= inicio && i.Fecha <= fin)
            .Join(_db.TiposHabitacion.AsNoTracking(),
                i => i.TipoHabitacionId,
                t => t.Id,
                (i, t) => new
                {
                    i.Id,
                    i.HotelId,
                    i.TipoHabitacionId,
                    TipoHabitacion = t.Nombre,
                    Fecha = i.Fecha,
                    i.UnidadesDisponibles
                })
            .OrderBy(x => x.Fecha)
            .ThenBy(x => x.TipoHabitacion)
            .ToListAsync();

        return Ok(new { hotelId, desde = inicio, hasta = fin, items });
    }

    [HttpPost("upsert")]
    public async Task<IActionResult> Upsert(Inventario input)
    {
        var fecha = input.Fecha.Date;

        var existente = await _db.Inventarios
            .FirstOrDefaultAsync(i =>
                i.HotelId == input.HotelId &&
                i.TipoHabitacionId == input.TipoHabitacionId &&
                i.Fecha == fecha);

        if (existente == null)
        {
            var entity = new Inventario
            {
                HotelId = input.HotelId,
                TipoHabitacionId = input.TipoHabitacionId,
                Fecha = fecha,
                UnidadesDisponibles = input.UnidadesDisponibles
            };

            _db.Inventarios.Add(entity);
            await _db.SaveChangesAsync();
            return Ok(entity);
        }

        existente.UnidadesDisponibles = input.UnidadesDisponibles;
        await _db.SaveChangesAsync();
        return Ok(existente);
    }
}