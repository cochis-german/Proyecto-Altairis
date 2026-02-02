using Altairis.Api.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// 1. Forzamos el puerto 8080 para que coincida con Docker y Next.js
builder.WebHost.UseUrls("http://*:8080");

// 2. Registramos controladores UNA sola vez con la configuración de CamelCase
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("default", p => p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
});

var app = builder.Build();

// 3. Lógica de Migraciones Automáticas (Siempre activa para Docker)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var tries = 0;
    while (true)
    {
        try {
            db.Database.Migrate();
            break;
        } catch {
            tries++;
            if (tries >= 20) throw; // Aumentamos reintentos por si SQL tarda en arrancar
            Thread.Sleep(3000);
        }
    }
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("default");
app.MapControllers();

app.Run();