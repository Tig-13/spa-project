namespace SpaProject.Models
{
    public class OfferType
    {
        public int OfferTypeId { get; set; }
        public string? OfferTypeName { get; set; }

        public List<Offer> Offers { get; set; }
    }
}
