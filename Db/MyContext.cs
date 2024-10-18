using Microsoft.EntityFrameworkCore;
using SpaProject.Models;

namespace SpaProject.Db
{
     public class MyContext : DbContext
{
    public MyContext(DbContextOptions<MyContext> options) : base(options) { }
    public DbSet<User> Users { get; set; }
    public DbSet<Offer> Offers {get; set;}
}

}
