using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;

namespace Project_BE_Solution.Models.Data.EF
{
    public class BEDbContextFactory : IDesignTimeDbContextFactory<BEDbContext>
    {
        public BEDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("BeSolutionDb");

            var optionsBuilder = new DbContextOptionsBuilder<BEDbContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new BEDbContext(optionsBuilder.Options);
        }
    }
}
