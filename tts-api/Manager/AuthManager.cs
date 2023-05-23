using System.Linq;
using System.Security.Claims;
using tts_api.Data.Models.DTO;

namespace tts_api.Manager
{
    public class AuthManager : IAuthManager
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthManager(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
        }
        public DiscordUser GetDiscordUser()
        {
            var userId = _httpContextAccessor.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var name = _httpContextAccessor.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Name).Value;
            var avatarHash = _httpContextAccessor.HttpContext.User.Claims.First(c => c.Type == "urn:discord:avatar:hash").Value;
            var discriminator = _httpContextAccessor.HttpContext.User.Claims.First(c => c.Type == "urn:discord:user:discriminator").Value;

            DiscordUser discordUser = new DiscordUser();
            discordUser.Name = name;
            discordUser.AvatarHash = avatarHash;
            discordUser.Discriminator = discriminator;
            discordUser.UserId = userId;

            return discordUser;
        }

    }
}
