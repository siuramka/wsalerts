namespace tts_api.Controllers;

using Microsoft.AspNetCore.Mvc;
using tts_api.Authorization;
using tts_api.Data.Models.DTO.Accounts;
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
    [HttpGet("authenticate")]
    public async Task<IActionResult> Authenticate(string? code)
    {
        var aaaa = await _accountService.Authenticate(new DiscordLoginRequest() { code = code });
        return Ok();
    }

    [HttpGet("current")]
    public IActionResult GetCurrent()
    {
        return Ok(Account);
    }
}
