using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tts_api.Authorization;
using tts_api.Data.Database;
using tts_api.Data.Models.DTO.Providers;

namespace tts_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SelectedProviderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public SelectedProviderController(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        [HttpPatch]
        public async Task<ActionResult> UpdateSelectedProvider([FromBody] SelectedProviderUpdate selectedProviderUpdate)
        {
            var selectedProvider = await _context.SelectedProvider.Include(x => x.Provider).FirstOrDefaultAsync();
            if (selectedProvider == null)
            {
                throw new Exception("Selected provider not found in database!");
            } else
            {
                selectedProvider.ProviderId = selectedProviderUpdate.Id;
                await _context.SaveChangesAsync();
                return NoContent();
            }
        }
    }
}
