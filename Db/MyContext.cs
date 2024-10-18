using Microsoft.EntityFrameworkCore;
using SpaProject.Models;

namespace SpaProject.Db
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<OfferType> OfferTypes { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Offer>()
                .HasOne(o => o.OfferType) 
                .WithMany(ot => ot.Offers)
                .HasForeignKey(o => o.OfferTypeId);
        }

    }

}
