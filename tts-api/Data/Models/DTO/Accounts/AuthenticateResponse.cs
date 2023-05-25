namespace tts_api.Data.Models.DTO.Accounts;

using tts_api.Data.Models.DTO.Discord;
using tts_api.Entities;

public class AuthenticateResponse
{
    public int Id { get; set; }
    public string DiscordId { get; set; }
    public string Username { get; set; }
    public string Avatar { get; set; }
    public string Discriminator { get; set; }
    public string Token { get; set; }


    public AuthenticateResponse(User user, string token)
    {
        Id = user.Id;
        DiscordId = user.discordId;
        Username = user.username;
        Avatar = user.avatar;
        Discriminator = user.discriminator;
        Token = token;
    }
}