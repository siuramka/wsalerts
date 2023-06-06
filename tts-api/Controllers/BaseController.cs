namespace tts_api.Controllers;

using Microsoft.AspNetCore.Mvc;
using tts_api.Data.Models;
using tts_api.Entities;

[Controller]
public abstract class BaseController : ControllerBase
{
    // returns the current authenticated account (null if not logged in)
    public User? User => (User?)HttpContext.Items["User"];
}