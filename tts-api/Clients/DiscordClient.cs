using RestSharp;
using RestSharp.Authenticators;
using System.Text.Json.Serialization;
using tts_api.Data.Models.DTO.Discord;
using System.Configuration;

namespace tts_api.Clients
{
    public interface IDiscordClient
    {
        Task<DiscordUser> GetUser();
    }
    /// <summary>
    /// https://restsharp.dev/usage.html#recommended-usage
    /// </summary>
    public class DiscordClient : IDiscordClient, IDisposable
    {
        readonly RestClient _client;
        public DiscordClient(string discordCode, string _clientId, string _clientSecret, string _scopes, string _redirectUrl)
        {
            var clientId = _clientId;
            var clientSecret = _clientSecret;
            var scopes = _scopes;
            var redirectUrl = _redirectUrl;

            var options = new RestClientOptions("https://discord.com") { Authenticator = new DiscordAuthenticator("https://discord.com", clientId, clientSecret, scopes, redirectUrl, discordCode) };
            _client = new RestClient(options);
        }
        public async Task<DiscordUser> GetUser()
        {
            var response = await _client.GetJsonAsync<DiscordUser>("/api/users/@me");
            return response;
        }
        public void Dispose()
        {
            _client?.Dispose();
            GC.SuppressFinalize(this);
        }
    }
    public class DiscordAuthenticator : AuthenticatorBase
    {
        readonly string _baseUrl;
        readonly string _clientId;
        readonly string _clientSecret;
        readonly string _scopes;
        readonly string _redirectUri;
        readonly string _discordCode;

        public DiscordAuthenticator(string baseUrl, string clientId, string clientSecret,string scopes, string redirectUri, string discordCode) : base("")
        {
            _baseUrl = baseUrl;
            _clientId = clientId;
            _clientSecret = clientSecret;
            _scopes = scopes;
            _redirectUri = redirectUri;
            _discordCode = discordCode;
        }

        protected override async ValueTask<Parameter> GetAuthenticationParameter(string accessToken)
        {
            var token = string.IsNullOrEmpty(Token) ? await GetToken() : Token;
            return new HeaderParameter(KnownHeaders.Authorization, token);
        }

        async Task<string> GetToken()
        {
            var options = new RestClientOptions(_baseUrl);
            var client = new RestClient(options);

            var request = new RestRequest("/api/oauth2/token", Method.Post);
            request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
            request.AddParameter("client_id", _clientId);
            request.AddParameter("client_secret", _clientSecret);
            request.AddParameter("grant_type", "authorization_code");
            request.AddParameter("code", _discordCode);
            request.AddParameter("redirect_uri", _redirectUri);

            var response = await client.PostAsync<DiscordOAuthTokenResponse>(request);
            return $"{response!.token_type} {response!.access_token}";
        }
    }
}
