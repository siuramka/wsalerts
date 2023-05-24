namespace tts_api.Controllers;

using Microsoft.AspNetCore.Mvc;
using tts_api.Authorization;
using tts_api.Data.Models.Accounts;
using tts_api.Services;

[ApiController]
[Authorize]
[Route("[controller]")]
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
    public async Task<IActionResult> Authenticate(string code)
    {
        return Ok();
    }

    [HttpGet("current")]
    public IActionResult GetCurrent()
    {
        return Ok(Account);
    }

    [HttpPut("current")]
    public async Task<IActionResult> UpdateCurrent(UpdateRequest model)
    {
        var account = await _accountService.Update(Account!.Id, model);
        return Ok(account);
    }

    [HttpDelete("current")]
    public async Task<IActionResult> DeleteCurrent()
    {
        await _accountService.Delete(Account!.Id);
        return Ok();
    }
}
