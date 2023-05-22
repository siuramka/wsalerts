using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tts_api.Data.Database;
using tts_api.Data.Models;

namespace tts_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoiceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public VoiceController(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        // GET: api/Participant
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Voice>>> GetVoices()
        {
            return await _context.Voice.ToListAsync();
        }
    }
}
