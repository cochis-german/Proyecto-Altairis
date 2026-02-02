using Altairis.Api.Data;
using Altairis.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Altairis.Api.Controllers;

[ApiController]
[Route("api/clientes")]
public class ClientesController : ControllerBase
{
    private readonly AppDbContext _db;
    public ClientesController(AppDbContext db) { _db = db; }

    [HttpGet]
    public async Task<IActionResult> Listar([FromQuery] string? q)
    {
        var query = _db.Clientes.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim().ToLower();
            query = query.Where(c =>
                c.NombreCompleto.ToLower().Contains(term) ||
                c.Email.ToLower().Contains(term) ||
                c.Documento.ToLower().Contains(term));
        }

        var items = await query
            .OrderBy(c => c.NombreCompleto)
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Obtener(int id)
    {
        var item = await _db.Clientes.AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id);

        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Crear(Cliente input)
    {
        var entity = new Cliente
        {
            NombreCompleto = (input.NombreCompleto ?? "").Trim(),
            Email = (input.Email ?? "").Trim(),
            Documento = (input.Documento ?? "").Trim()
        };

        _db.Clientes.Add(entity);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Obtener), new { id = entity.Id }, entity);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Actualizar(int id, Cliente input)
    {
        var entity = await _db.Clientes.FirstOrDefaultAsync(c => c.Id == id);
        if (entity == null) return NotFound();

        entity.NombreCompleto = (input.NombreCompleto ?? "").Trim();
        entity.Email = (input.Email ?? "").Trim();
        entity.Documento = (input.Documento ?? "").Trim();

        await _db.SaveChangesAsync();
        return Ok(entity);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Eliminar(int id)
    {
        var entity = await _db.Clientes.FirstOrDefaultAsync(c => c.Id == id);
        if (entity == null) return NotFound();

        _db.Clientes.Remove(entity);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}