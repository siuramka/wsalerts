using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tts_api.Authorization;
using tts_api.Data.Database;
using tts_api.Data.Models.DTO.Providers;
using tts_api.Data.Models.DTO.Settings;

namespace tts_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public SettingsController(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        [HttpGet]
        public async Task<ActionResult<SettingsDto>> GetSettings()
        {
            var settings = await _context.Settings.FirstOrDefaultAsync();
            if (settings == null)
            {
                return NotFound();
            } else
            {
                return Ok(settings);
            }
        }

        [HttpPatch]
        public async Task<ActionResult> UpdateSettings(SettingsDto settingsDto)
        {
            try
            {
                var settings = await _context.Settings.FirstOrDefaultAsync();

                if (settings == null)
                {
                    throw new Exception("Settings not found in database!");
                }
                else
                {
                    settings.Muted = settingsDto.Muted;
                    await _context.SaveChangesAsync();
                    return NoContent();

                }
            } 
            catch
            {
                return NotFound();
            }
        }
    }
}
