namespace tts_api.Services;

using Microsoft.Extensions.Options;
using RestSharp;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using tts_api.Authorization;
using tts_api.Data.Database;
using tts_api.Data.Models.Accounts;
using tts_api.Entities;
using tts_api.Helpers;

public interface IAccountService
{
    Task<AuthenticateResponse> Authenticate(DiscordLoginRequest model);
    Task<Account> Update(int id, UpdateRequest model);
    Task Delete(int id);
    Task<string> Login();
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
    public async Task<string> Login()
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
        return url;
    }
    public async Task<AuthenticateResponse> Authenticate(DiscordLoginRequest model)
    {
        // verify access token with facebook API to authenticate
        //var client = new RestClient("https://graph.facebook.com/v8.0");
        //var request = new RestRequest($"me?access_token={model.AccessToken}");
        //var response = await client.GetAsync(request);

        //if (!response.IsSuccessful)
        //    throw new AppException(response.ErrorMessage!);

        //// get data from response and account from db
        //var data = JsonSerializer.Deserialize<Dictionary<string, string>>(response.Content!);
        //var facebookId = long.Parse(data!["id"]);
        //var name = data["name"];
        //var account = _context.Accounts.SingleOrDefault(x => x.FacebookId == facebookId);

        //// create new account if first time logging in
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

        //// generate jwt token to access secure routes on this API
        ////var token = _jwtUtils.GenerateJwtToken(account);

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