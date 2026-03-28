using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;

namespace WaterProject.API.Data
{
    public class WaterDbContext: DbContext
    {
        public WaterDbContext(DbContextOptions options) : base(options)
        {
        }
        
        public DbSet<Project> Projects { get; set; }
    }
}
