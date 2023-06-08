using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tts_api.Authorization;
using tts_api.Data.Database;
using tts_api.Data.Models;
using tts_api.Data.Models.DTO;
using tts_api.Data.Models.DTO.Providers;
using tts_api.Data.Models.DTO.Voice;

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
        [HttpGet("provider/{provider}")]
        public async Task<ActionResult<IEnumerable<Voice>>> GetProviderVoices([FromRoute] string provider)
        {
            if(provider == null)
            {
                return BadRequest();
            }

            var query = await _context.Voice.Include(p => p.Provider).Where(pwv => pwv.Provider.Name.ToLower() == provider.ToLower()).Select(x => new ProviderVoice(x)).ToListAsync();

            if (query.Any())
            {
                return Ok(query);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpPost("provider")]
        public async Task<ActionResult<Voice>> PostVoiceProvider([FromBody] ProviderVoiceInsert providerVoiceInsert)
        {
            var exists = await _context.Voice.AnyAsync(x => x.Name == providerVoiceInsert.ApiVoiceName|| x.DisplayName == providerVoiceInsert.DisplayName);
            var providerByName = await _context.Provider.FirstOrDefaultAsync(x => x.Name.ToLower() == providerVoiceInsert.ProviderName);

            if (exists || providerByName is null)
            {
                return BadRequest();
            }
            else
            {
                Voice tempVoice = new Voice(providerVoiceInsert);
                tempVoice.ProviderId = providerByName.Id;
                try
                {
                    var test = _context.Add(tempVoice);
                    await _context.SaveChangesAsync();
                }
                catch
                {
                    return BadRequest();
                }
                return Ok();
            }
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
                    var test = _context.Add(tempVoice);
                    await _context.SaveChangesAsync();
                }
                catch
                {
                    return BadRequest();
                }
                return Ok(tempVoice);
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteVoice([FromRoute] string id)
        {
            var deletingVoice = await _context.Voice.FirstOrDefaultAsync(x => x.Id.ToString() == id);
            if(deletingVoice == null)
            {
                return BadRequest();
            }
            else
            {
                try
                {
                    var deleted = _context.Remove(deletingVoice);
                    await _context.SaveChangesAsync();
                }
                catch
                {
                    return BadRequest();
                }
                return Ok();
            }
        }
    }
}
