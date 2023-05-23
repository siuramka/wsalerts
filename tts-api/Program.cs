
using Microsoft.EntityFrameworkCore;
using AspNet.Security.OAuth.Discord;
using tts_api.Data.Database;
using Microsoft.AspNetCore.Authentication.Cookies;
using tts_api.Manager;

namespace tts_api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();

            var serverVersion = new MariaDbServerVersion(new Version(10, 4, 24));
            var connectionString = builder.Configuration.GetConnectionString("MySqlDatabase") ?? throw new Exception("mariadb coonection string missing");

            builder.Services.AddDbContext<ApplicationDbContext>(
                dbContextOptions => dbContextOptions
                    .UseMySql(connectionString, serverVersion)
                    // The following three options help with debugging, but should
                    // be changed or removed for production.
                    .LogTo(Console.WriteLine, LogLevel.Information)
                    .EnableSensitiveDataLogging()
                    .EnableDetailedErrors()
            );

            builder.Services.AddAuthentication(opt =>
            {
                opt.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                opt.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = DiscordAuthenticationDefaults.AuthenticationScheme;
            })
            .AddCookie()
            .AddDiscord(options =>
            {
                options.ClientId = builder.Configuration["DiscordOAuth:ClientId"] ?? throw new Exception("Discord Client Id missing");
                options.ClientSecret = builder.Configuration["DiscordOAuth:ClientSecret"] ?? throw new Exception("Discord Secretmissing");
                options.SaveTokens = true;
            });

            builder.Services.AddControllers();

            builder.Services.AddRouting(options => options.LowercaseUrls = true);

            builder.Services.AddHttpContextAccessor();
            builder.Services.AddTransient<IAuthManager, AuthManager>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors(options =>
            options.WithOrigins("http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader());

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}