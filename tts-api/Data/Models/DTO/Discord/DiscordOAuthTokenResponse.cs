namespace tts_api.Data.Models.DTO.Discord
{
    public class DiscordOAuthTokenResponse
    {
        public string access_token { get; set; }
        public long expires_in { get; set; }
        public string refresh_token { get; set; }
        public string scope { get; set; }
        public string token_type { get; set; }
    }
}
