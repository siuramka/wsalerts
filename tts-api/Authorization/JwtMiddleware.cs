namespace tts_api.Authorization;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using tts_api.Data.Database;
using tts_api.Helpers;

public class JwtMiddleware
{
    private readonly RequestDelegate _next;
    private readonly AppSettings _appSettings;

    public JwtMiddleware(RequestDelegate next, IOptions<AppSettings> appSettings)
    {
        _next = next;
        _appSettings = appSettings.Value;
    }

    public async Task Invoke(HttpContext context, ApplicationDbContext dataContext, IJwtUtils jwtUtils)
    {
        var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        var discordId = jwtUtils.ValidateJwtToken(token);
        if (discordId != null)
        {
            //need this to get user from db apparently
            //attach account to context on successful jwt validation
            context.Items["User"] = await dataContext.User.SingleOrDefaultAsync(x => x.discordId == discordId);
        }

        await _next(context);
    }
}