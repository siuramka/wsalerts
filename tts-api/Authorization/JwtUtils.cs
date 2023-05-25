namespace tts_api.Authorization;

using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using tts_api.Data.Database;
using tts_api.Data.Models;
using tts_api.Data.Models.DTO;
using tts_api.Data.Models.DTO.Discord;
using tts_api.Entities;
using tts_api.Helpers;

public interface IJwtUtils
{
    public string GenerateJwtToken(User user);
    public string? ValidateJwtToken(string? token);
}

public class JwtUtils : IJwtUtils
{
    private readonly ApplicationDbContext _context;
    private readonly AppSettings _appSettings;

    public JwtUtils(
        ApplicationDbContext context,
        IOptions<AppSettings> appSettings)
    {
        _context = context;
        _appSettings = appSettings.Value;

        if (string.IsNullOrEmpty(_appSettings.Secret))
            throw new AppException("JWT secret not configured");
    }

    public string GenerateJwtToken(User user)
    {
        // generate token that is valid for 15 minutes
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_appSettings.Secret!);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim("discordId", user.discordId.ToString()) }),
            Expires = DateTime.UtcNow.AddMinutes(15),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public string? ValidateJwtToken(string? token)
    {
        if (token == null)
            return null;

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_appSettings.Secret!);
        try
        {
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            var userId = jwtToken.Claims.First(x => x.Type == "discordId").Value;

            // return account id from JWT token if validation successful
            return userId;
        }
        catch
        {
            // return null if validation fails
            return null;
        }
    }
}