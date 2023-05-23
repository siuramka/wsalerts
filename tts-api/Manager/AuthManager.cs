using System.Linq;

namespace tts_api.Manager
{
    public class AuthManager : IAuthManager
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthManager(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
        }
        public bool IsAuthenticated()
        {
            var userClaims = _httpContextAccessor.HttpContext.User.Claims.ToList();

            if(userClaims.Count > 1)
            {
                return true;
            }

            return false;
        }

    }
}
