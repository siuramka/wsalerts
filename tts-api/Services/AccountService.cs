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
        var discordClient = new DiscordClient(model.code, clientId,clientSecret,scopes,redirectUrl);

        var res = await discordClient.GetUser();
        //var request = new RestRequest("", Method.Post);
        //request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
        //request.AddParameter("client_id", clientId);
        //request.AddParameter("client_secret", clientSecret);
        //request.AddParameter("grant_type", "authorization_code");
        //request.AddParameter("code", model.code);
        //request.AddParameter("redirect_uri", redirectUrl);

        //var response = await client.ExecuteAsync<DiscordOAuthTokenResponse>(request);
        //if (!response.IsSuccessful)
        //    throw new AppException(response.ErrorMessage!);
        //{ "access_token": "qGPN3qenjeu8GSMVM6aTAC6adX0RaR", "expires_in": 604800, "refresh_token": "mshdn3G6ihMonnGicdwWtmm5s7byky", "scope": "identify", "token_type": "Bearer"}

        // get data from response and account from db
        //var account = _context.Accounts.SingleOrDefault(x => x.FacebookId == facebookId);

        // create new account if first time logging in
        //if (account == null)
        //{
        //    account = new Account
        //    {
        //        FacebookId = facebookId,
        //        Name = name,
        //        ExtraInfo = $"This is some extra info about {name} that is saved in the API"
        //    };
        //    _context.Accounts.Add(account);
        //    await _context.SaveChangesAsync();
        //}
        //var client2 = new RestClient("https://discordapp.com/api/users/@me");

        //var request2 = new RestRequest("", Method.Get);
        //request2.AddHeader("Content-Type", "application/x-www-form-urlencoded");
        //request2.AddHeader("Authorization", "Bearer " + response.Data.access_token);

        //var response2 = await client2.ExecuteAsync<DiscordUserMe>(request2);


        //DiscordUser discordUser = new DiscordUser();
        //discordUser.Name = ;
        //discordUser.AvatarHash = avatarHash;
        //discordUser.Discriminator = discriminator;
        //discordUser.UserId = userId;


        ////generate jwt token to access secure routes on this API
        //var token = _jwtUtils.GenerateJwtToken(account);

        //return new AuthenticateResponse(account, token);
        return null;
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