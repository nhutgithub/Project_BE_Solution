using Microsoft.EntityFrameworkCore;
using Project_BE_Solution.Models.Data.Configurations;
using Project_BE_Solution.Models.Data.Entities;

namespace Project_BE_Solution.Models.Data.EF
{
    public class BEDbContext : DbContext
    {
        public BEDbContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new EmployeesConfig());
        }
        public DbSet<Employee> Employees { get; set; } = null!;
    }
}
