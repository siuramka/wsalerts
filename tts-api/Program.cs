
using Microsoft.EntityFrameworkCore;
using tts_api.Data.Database;
using Microsoft.AspNetCore.Authentication.Cookies;
using tts_api.Manager;
using tts_api.Authorization;
using tts_api.Services;
using tts_api.Helpers;

namespace tts_api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                    builder =>
                      builder.WithOrigins("http://localhost:5106", "https://localhost:5173", "https://discord.com", "http://discord.com")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            builder.Services.AddControllers();
            builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

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

            builder.Services.AddControllers();

            builder.Services.AddRouting(options => options.LowercaseUrls = true);

            builder.Services.AddHttpContextAccessor();
            builder.Services.AddTransient<IAuthManager, AuthManager>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddScoped<IJwtUtils, JwtUtils>();
            builder.Services.AddScoped<IAccountService, AccountService>();

            var app = builder.Build();

            app.UseCors(MyAllowSpecificOrigins);
            app.UseRouting();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            // global error handler
            app.UseMiddleware<ErrorHandlerMiddleware>();

            // custom jwt auth middleware
            app.UseMiddleware<JwtMiddleware>();

            app.MapControllers();

            app.Run();
        }
    }
}