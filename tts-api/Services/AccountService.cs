namespace tts_api.Services;

using Microsoft.Extensions.Options;
using RestSharp;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Xml.Linq;
using tts_api.Authorization;
using tts_api.Data.Database;
using tts_api.Data.Models.DTO;
using tts_api.Data.Models;
using tts_api.Data.Models.DTO.Accounts;
using tts_api.Entities;
using tts_api.Helpers;
using tts_api.Data.Models.DTO.Discord;
using tts_api.Clients;
using Microsoft.EntityFrameworkCore;

public interface IAccountService
{
    Task<AuthenticateResponse> Authenticate(DiscordLoginRequest model);
    Task<Account> Update(int id, UpdateRequest model);
    Task Delete(int id);
    Task<DiscordAuth> Login();
}

public class AccountService : IAccountService
{
    private readonly ApplicationDbContext _context;
    private readonly IJwtUtils _jwtUtils;
    private readonly AppSettings _appSettings;
    private readonly IConfiguration _configuration;

    public AccountService(
        ApplicationDbContext context,
        IJwtUtils jwtUtils,
        IOptions<AppSettings> appSettings,
        IConfiguration configuration
        )
    {
        _context = context;
        _jwtUtils = jwtUtils;
        _appSettings = appSettings.Value;
        _configuration = configuration;
    }
    public async Task<DiscordAuth> Login()
    {
        var clientId = _configuration["DiscordOAuth:ClientId"];
        var scopes = _configuration["DiscordOAuth:Scopes"];
        var redirectUrl = _configuration["DiscordOAuth:FrontendCallback"];

        string baseUri = "https://discord.com";

        UriBuilder uriBuilder = new UriBuilder(baseUri);
        uriBuilder.Path = "/oauth2/authorize";

        var query = new StringBuilder();

        query.Append($"?client_id={Uri.EscapeDataString(clientId)}");
        query.Append($"&scope={Uri.EscapeDataString(scopes)}");
        query.Append($"&response_type=code");
        query.Append($"&redirect_uri={Uri.EscapeDataString(redirectUrl)}");

        uriBuilder.Query = query.ToString();
        string url = uriBuilder.Uri.ToString();

        var response = new DiscordAuth();
        response.Uri = url;

        return response;
    }
    //https://discord.com/developers/docs/topics/oauth2 vulnerable to csfr cause no session hehe
    public async Task<AuthenticateResponse> Authenticate(DiscordLoginRequest model)
    {
        var client = new RestClient("https://discordapp.com/api/oauth2/token");

        var clientId = _configuration["DiscordOAuth:ClientId"];
        var clientSecret = _configuration["DiscordOAuth:ClientSecret"];
        var scopes = _configuration["DiscordOAuth:Scopes"];
        var redirectUrl = _configuration["DiscordOAuth:FrontendCallback"];

        try
        {
            var discordClient = new DiscordClient(model.code, clientId, clientSecret, scopes, redirectUrl);
            var discordUser = await discordClient.GetUser();

            //---------------------------------
            // this check shouldnt be here
            var authorizedIds = new List<string> { "164006905365135360", "99310785854980096", "126877985788657666", "303188356794155018"};

            if(!authorizedIds.Any(x => x == discordUser.id)){
                return null;
            }
            //---------------------------------


            var user = await _context.User.SingleOrDefaultAsync(x => x.discordId == discordUser.id);

            // create new user in database if doesnt exist
            if (user == null)
            {
                user = new User
                {
                    discordId = discordUser.id,
                    avatar = discordUser.avatar,
                    discriminator = discordUser.discriminator,
                    username = discordUser.username
                };

                _context.User.AddAsync(user);
                await _context.SaveChangesAsync();
            }

            var token = _jwtUtils.GenerateJwtToken(user);

            return new AuthenticateResponse(user, token);

        }
        catch
        {
            return null;
        }
    }

    public async Task<Account> Update(int id, UpdateRequest model)
    {
        var account = await getAccount(id);

        // update
        account.Name = model.Name;
        account.ExtraInfo = model.ExtraInfo;

        // save
        //_context.Accounts.Update(account);
        await _context.SaveChangesAsync();

        return account;
    }

    public async Task Delete(int id)
    {
        var account = await getAccount(id);
        //_context.Accounts.Remove(account);
        await _context.SaveChangesAsync();
    }

    // helper methods

    private async Task<Account> getAccount(int id)
    {
        //var account = await _context.Accounts.FindAsync(id);
        //if (account == null)
        //    throw new KeyNotFoundException("Account not found");
        return null;
    }
}