using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tts_api.Authorization;
using tts_api.Data.Database;
using tts_api.Data.Models;

namespace tts_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProviderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ProviderController(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        // GET: api/Voice
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Provider>>> GetProviders()
        {
            return await _context.Provider.ToListAsync();
        }
    }
}
