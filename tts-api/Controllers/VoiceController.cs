using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tts_api.Authorization;
using tts_api.Data.Database;
using tts_api.Data.Models;
using tts_api.Data.Models.DTO;

namespace tts_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class VoiceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public VoiceController(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        // GET: api/Voice
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Voice>>> GetVoices()
        {
            return await _context.Voice.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Voice>> PostVoice(VoiceInsert voiceInsert)
        {
            var exists = await _context.Voice.AnyAsync(x => x.Name == voiceInsert.Name || x.DisplayName == voiceInsert.DisplayName);

            if (exists)
            {
                return BadRequest();
            }
            else
            {
                Voice tempVoice = new Voice(voiceInsert);
                try
                {
                    var test =_context.Add(tempVoice);
                    await _context.SaveChangesAsync();
                }
                catch
                {
                    return BadRequest();
                }
                return Ok(tempVoice);
            }
        }
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutVoice(int id, )
    }
}
