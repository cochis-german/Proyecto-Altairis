using Altairis.Api.Data;
using Altairis.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Altairis.Api.Controllers;

[ApiController]
[Route("api/tipos-habitacion")]
public class TiposHabitacionController : ControllerBase
{
    private readonly AppDbContext _db;
    public TiposHabitacionController(AppDbContext db) { _db = db; }

    [HttpGet]
    public async Task<IActionResult> Listar([FromQuery] int? hotelId)
    {
        var query = _db.TiposHabitacion.AsNoTracking();

        if (hotelId.HasValue)
            query = query.Where(t => t.HotelId == hotelId.Value);

        var items = await query
            .OrderBy(t => t.Nombre)
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Obtener(int id)
    {
        var item = await _db.TiposHabitacion.AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == id);

        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Crear(TipoHabitacion input)
    {
        var hotelExiste = await _db.Hoteles.AnyAsync(h => h.Id == input.HotelId);
        if (!hotelExiste) return BadRequest("Hotel no existe");

        var entity = new TipoHabitacion
        {
            HotelId = input.HotelId,
            Nombre = (input.Nombre ?? "").Trim(),
            Capacidad = input.Capacidad,
            Precio = input.Precio
        };

        _db.TiposHabitacion.Add(entity);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Obtener), new { id = entity.Id }, entity);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Actualizar(int id, TipoHabitacion input)
    {
        var entity = await _db.TiposHabitacion.FirstOrDefaultAsync(t => t.Id == id);
        if (entity == null) return NotFound();

        entity.Nombre = (input.Nombre ?? "").Trim();
        entity.Capacidad = input.Capacidad;
        entity.Precio = input.Precio;

        await _db.SaveChangesAsync();
        return Ok(entity);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Eliminar(int id)
    {
        var entity = await _db.TiposHabitacion.FirstOrDefaultAsync(t => t.Id == id);
        if (entity == null) return NotFound();

        _db.TiposHabitacion.Remove(entity);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
