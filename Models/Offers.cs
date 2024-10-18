namespace SpaProject.Models
{
    public class Offer
    {
        public int OfferId { get; set; }
        public string? OfferName { get; set; } 
        public string? OfferDescription { get; set; } 
        public decimal OfferPrice { get; set; } 
        public int OfferDuration { get; set; }
        public string? OfferImageUrl { get; set; }

        public int OfferTypeId { get; set; }  
        public OfferType OfferType { get; set; }  

    }
}
