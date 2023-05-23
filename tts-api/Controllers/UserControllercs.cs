using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using tts_api.Manager;

namespace tts_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAuthManager _authManager;
        public UserController(IAuthManager authManager) 
        {
            _authManager = authManager;
        }

        //get user
        [HttpGet]
        public IActionResult GetUser()
        {
            var discordUser = _authManager.GetDiscordUser();
            return Ok(discordUser);
        }
    }
}
