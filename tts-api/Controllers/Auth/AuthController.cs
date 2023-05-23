using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using tts_api.Manager;

namespace tts_api.Controllers.Auth
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthManager _authManager;
        public AuthController(IAuthManager authManager) {
            _authManager = authManager;
        }

        [HttpGet]
        public IActionResult Login(string returnUrl = "/")
        {
            if (!_authManager.IsAuthenticated())
            {
                return Challenge(new AuthenticationProperties { RedirectUri = returnUrl }, "Discord");
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            try
            {
                if(_authManager.IsAuthenticated())
                {
                    await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                    return Ok();
                } 
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
        }
    }
}
