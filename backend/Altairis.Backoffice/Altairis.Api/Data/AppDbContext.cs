using Altairis.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Altairis.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Hotel> Hoteles => Set<Hotel>();
    public DbSet<TipoHabitacion> TiposHabitacion => Set<TipoHabitacion>();
    public DbSet<Inventario> Inventarios => Set<Inventario>();
    public DbSet<Cliente> Clientes => Set<Cliente>();
    public DbSet<Reserva> Reservas => Set<Reserva>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Hotel>().HasIndex(x => x.Nombre);

        modelBuilder.Entity<TipoHabitacion>()
            .Property(x => x.Precio)
            .HasPrecision(18, 2);

        modelBuilder.Entity<TipoHabitacion>()
            .HasOne(x => x.Hotel)
            .WithMany(x => x.TiposHabitacion)
            .HasForeignKey(x => x.HotelId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Inventario>()
            .HasOne(x => x.Hotel)
            .WithMany(x => x.Inventarios)
            .HasForeignKey(x => x.HotelId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Inventario>()
            .HasOne(x => x.TipoHabitacion)
            .WithMany(x => x.Inventarios)
            .HasForeignKey(x => x.TipoHabitacionId)
            .OnDelete(DeleteBehavior.Restrict);


        modelBuilder.Entity<Cliente>().HasIndex(x => x.Email);

        modelBuilder.Entity<Reserva>()
            .HasOne(x => x.Hotel)
            .WithMany(x => x.Reservas)
            .HasForeignKey(x => x.HotelId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Reserva>()
            .HasOne(x => x.TipoHabitacion)
            .WithMany(x => x.Reservas)
            .HasForeignKey(x => x.TipoHabitacionId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Reserva>()
            .HasOne(x => x.Cliente)
            .WithMany(x => x.Reservas)
            .HasForeignKey(x => x.ClienteId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Inventario>()
            .HasIndex(x => new { x.HotelId, x.TipoHabitacionId, x.Fecha })
            .IsUnique();
    }
}
