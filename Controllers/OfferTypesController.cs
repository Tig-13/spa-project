using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpaProject.Db;
using SpaProject.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SpaProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OfferTypesController : ControllerBase
    {
        private readonly MyContext _context;

        public OfferTypesController(MyContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OfferType>>> GetOfferTypes()
        {
            if (!_context.OfferTypes.Any())
            {
                var defaultOfferTypes = new List<OfferType>
                {
                    new OfferType { OfferTypeName = "Massage" },
                    new OfferType { OfferTypeName = "Scrub" },
                    new OfferType { OfferTypeName = "Aromatherapy" },
                    new OfferType { OfferTypeName = "Manicure & Pedicure" }
                };

                _context.OfferTypes.AddRange(defaultOfferTypes);
                await _context.SaveChangesAsync();
            }

            var offerTypes = await _context.OfferTypes.ToListAsync();
            return Ok(offerTypes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OfferType>> GetOfferTypeById(int id)
        {
            var offerType = await _context.OfferTypes.SingleOrDefaultAsync(ot => ot.OfferTypeId == id);
            if (offerType == null)
            {
                return NotFound();
            }

            return Ok(offerType);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOfferType([FromBody] OfferType newOfferType)
        {
            _context.OfferTypes.Add(newOfferType);
            await _context.SaveChangesAsync();
            return Ok(newOfferType);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOfferType(int id, [FromBody] OfferType updatedOfferType)
        {
            var offerType = await _context.OfferTypes.SingleOrDefaultAsync(ot => ot.OfferTypeId == id);
            if (offerType == null)
            {
                return NotFound();
            }

            offerType.OfferTypeName = updatedOfferType.OfferTypeName;
            await _context.SaveChangesAsync();
            return Ok(offerType);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOfferType(int id)
        {
            var offerType = await _context.OfferTypes.SingleOrDefaultAsync(ot => ot.OfferTypeId == id);
            if (offerType == null)
            {
                return NotFound();
            }

            _context.OfferTypes.Remove(offerType);
            await _context.SaveChangesAsync();
            return Ok("Offer type deleted");
        }
    }
}
