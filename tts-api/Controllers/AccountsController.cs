namespace tts_api.Controllers;

using Microsoft.AspNetCore.Mvc;
using tts_api.Authorization;
using tts_api.Data.Models.DTO.Discord;
using tts_api.Services;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class AccountsController : BaseController
{
    private IAccountService _accountService;

    public AccountsController(IAccountService accountService)
    {
        _accountService = accountService;
    }

    [AllowAnonymous]
    [HttpGet("login")]
    public async Task<IActionResult> Login()
    {
        var response = await _accountService.Login();
        return Ok(response);
    }

    [AllowAnonymous]
    [HttpPost("authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] DiscordLoginRequest discordLoginRequest)
    {
        var response = await _accountService.Authenticate(discordLoginRequest);
        if (response != null)
        {
            return Ok(response);
        }
        return Unauthorized();
    }

    [HttpGet("current")]
    public IActionResult GetCurrent()
    {
        return Ok(User);
    }
}
