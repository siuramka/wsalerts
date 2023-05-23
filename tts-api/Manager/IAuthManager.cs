using tts_api.Data.Models.DTO;

namespace tts_api.Manager
{
    public interface IAuthManager
    {
        public DiscordUser GetDiscordUser();
    }
}