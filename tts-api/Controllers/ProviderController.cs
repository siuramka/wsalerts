using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tts_api.Authorization;
using tts_api.Data.Database;
using tts_api.Data.Models;
using tts_api.Data.Models.DTO.Providers;

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
        [HttpGet]

        public async Task<ActionResult<ProvidersResponse>> GetProviders()
        {
            var allProviders = await _context.Provider.Select(x => new ProvidersResponse(x)).ToListAsync();

            if (allProviders.Any())
            {
                return Ok(allProviders);
            }
            else
            {
                return NotFound();
            }

        }

        [HttpGet("selected")]
        public async Task<ActionResult<SelectedProviderResponse>> GetSelectedProvider()
        {
            var selectedProvider = await _context.SelectedProvider.Include(x => x.Provider).FirstOrDefaultAsync();
            if(selectedProvider != null)
            {
                var response = new SelectedProviderResponse(selectedProvider);
                return Ok(response);
            }
            else
            {
                return NotFound();
            }
        }


    }
}
