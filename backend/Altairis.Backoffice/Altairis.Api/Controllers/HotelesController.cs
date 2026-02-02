using Altairis.Api.Data;
using Altairis.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Altairis.Api.Controllers;

[ApiController]
[Route("api/hoteles")]
public class HotelesController : ControllerBase
{
    private readonly AppDbContext _db;
    public HotelesController(AppDbContext db) { _db = db; }

    [HttpGet]
    public async Task<IActionResult> Listar([FromQuery] string? q)
    {
        var query = _db.Hoteles.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim().ToLower();
            query = query.Where(h =>
                h.Nombre.ToLower().Contains(term) ||
                h.Ciudad.ToLower().Contains(term) ||
                h.Pais.ToLower().Contains(term));
        }

        var items = await query
            .OrderBy(h => h.Nombre)
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Obtener(int id)
    {
        var hotel = await _db.Hoteles.AsNoTracking()
            .FirstOrDefaultAsync(h => h.Id == id);

        if (hotel == null) return NotFound();
        return Ok(hotel);
    }

    [HttpPost]
    public async Task<IActionResult> Crear(Hotel input)
    {
        var entity = new Hotel
        {
            Nombre = (input.Nombre ?? "").Trim(),
            Ciudad = (input.Ciudad ?? "").Trim(),
            Pais = (input.Pais ?? "").Trim(),
            Activo = input.Activo
        };

        _db.Hoteles.Add(entity);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Obtener), new { id = entity.Id }, entity);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Actualizar(int id, Hotel input)
    {
        var entity = await _db.Hoteles.FirstOrDefaultAsync(h => h.Id == id);
        if (entity == null) return NotFound();

        entity.Nombre = (input.Nombre ?? "").Trim();
        entity.Ciudad = (input.Ciudad ?? "").Trim();
        entity.Pais = (input.Pais ?? "").Trim();
        entity.Activo = input.Activo;

        await _db.SaveChangesAsync();
        return Ok(entity);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Eliminar(int id)
    {
        var entity = await _db.Hoteles.FirstOrDefaultAsync(h => h.Id == id);
        if (entity == null) return NotFound();

        _db.Hoteles.Remove(entity);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
