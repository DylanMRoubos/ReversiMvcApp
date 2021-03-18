using System;
using Microsoft.EntityFrameworkCore;
using ReversiMvcApp.Models;

namespace ReversiMvcApp.DAL
{
    public class ReversiDbContext : DbContext
    {
        public ReversiDbContext(DbContextOptions<ReversiDbContext> options) : base(options) { }

        public DbSet<Speler> Spelers { get; set; }

        public DbSet<Game> Game { get; set; }
    }
}
