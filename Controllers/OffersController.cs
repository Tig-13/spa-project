﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpaProject.Db;
using SpaProject.Models;

namespace SpaProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OffersController : ControllerBase
    {
        private readonly MyContext _context;

        public OffersController(MyContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetOffers()
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

            if (!_context.Offers.Any())
            {
                var massageType = await _context.OfferTypes.FirstOrDefaultAsync(t => t.OfferTypeName == "Massage");
                var scrubType = await _context.OfferTypes.FirstOrDefaultAsync(t => t.OfferTypeName == "Scrub");
                var aromatherapyType = await _context.OfferTypes.FirstOrDefaultAsync(t => t.OfferTypeName == "Aromatherapy");
                var manicurePedicureType = await _context.OfferTypes.FirstOrDefaultAsync(t => t.OfferTypeName == "Manicure & Pedicure");

                var defaultOffers = new List<Offer>
        {
            new Offer
            {
                OfferName = "Relaxing Massage",
                OfferDescription = "A 60-minute full-body massage designed to relieve tension and promote relaxation.",
                OfferPrice = 85.00m,
                OfferDuration = 60,
                OfferImageUrl = "/images/relaxing-massage.webp",
                OfferTypeId = massageType.OfferTypeId
            },
            new Offer
            {
                OfferName = "Body Scrub",
                OfferDescription = "A luxurious body scrub treatment to exfoliate and rejuvenate your skin.",
                OfferPrice = 75.00m,
                OfferDuration = 45,
                OfferImageUrl = "/images/body-scrub.webp",
                OfferTypeId = scrubType.OfferTypeId
            },
            new Offer
            {
                OfferName = "Aromatherapy",
                OfferDescription = "A relaxing aromatherapy session with essential oils to reduce stress and promote well-being.",
                OfferPrice = 50.00m,
                OfferDuration = 60,
                OfferImageUrl = "/images/aromatherapy.webp",
                OfferTypeId = aromatherapyType.OfferTypeId
            },
            new Offer
            {
                OfferName = "Manicure & Pedicure",
                OfferDescription = "Luxurious manicure and pedicure treatments with spa scrubs and moisturizing lotions.",
                OfferPrice = 40.00m,
                OfferDuration = 90,
                OfferImageUrl = "/images/manicure-pedicure.webp",
                OfferTypeId = manicurePedicureType.OfferTypeId
            }
        };

                _context.Offers.AddRange(defaultOffers);
                await _context.SaveChangesAsync();
            }

            var offers = await _context.Offers
                .Include(o => o.OfferType)
                .Select(o => new
                {
                    o.OfferId,
                    o.OfferName,
                    o.OfferDescription,
                    o.OfferPrice,
                    o.OfferDuration,
                    o.OfferImageUrl,
                    OfferTypeName = o.OfferType.OfferTypeName 
                })
                .ToListAsync();

            return Ok(offers);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Offer>> GetOfferById(int id)
        {
            var offer = await _context.Offers
                .Include(o => o.OfferType)
                .SingleOrDefaultAsync(o => o.OfferId == id);
            if (offer == null)
            {
                return NotFound();
            }

            return Ok(offer);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOffer([FromBody] Offer newOffer)
        {
            _context.Offers.Add(newOffer);
            await _context.SaveChangesAsync();
            return Ok(newOffer);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOffer(int id, [FromBody] Offer updatedOffer)
        {
            var offer = await _context.Offers.SingleOrDefaultAsync(o => o.OfferId == id);
            if (offer == null)
            {
                return NotFound();
            }

            offer.OfferName = updatedOffer.OfferName;
            offer.OfferDescription = updatedOffer.OfferDescription;
            offer.OfferPrice = updatedOffer.OfferPrice;
            offer.OfferDuration = updatedOffer.OfferDuration;
            offer.OfferTypeId = updatedOffer.OfferTypeId;

            await _context.SaveChangesAsync();
            return Ok(offer);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOffer(int id)
        {
            var offer = await _context.Offers.SingleOrDefaultAsync(o => o.OfferId == id);
            if (offer == null)
            {
                return NotFound();
            }

            _context.Offers.Remove(offer);
            await _context.SaveChangesAsync();
            return Ok("Offer deleted");
        }
    }
}
