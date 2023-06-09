using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using tts_api.Data.Models;

namespace tts_api.Data.Database
{
    public class ApplicationDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }
        public DbSet<Provider> Provider { get; set; }
        public DbSet<Voice> Voice { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<SelectedProvider> SelectedProvider { get; set; }
        public DbSet<Settings> Settings { get; set; }
    }
}
