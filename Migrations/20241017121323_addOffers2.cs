using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace spaproject.Migrations
{
    /// <inheritdoc />
    public partial class addOffers2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Offers",
                columns: table => new
                {
                    OfferId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OfferName = table.Column<string>(type: "TEXT", nullable: false),
                    OfferDescription = table.Column<string>(type: "TEXT", nullable: false),
                    OfferPrice = table.Column<decimal>(type: "TEXT", nullable: false),
                    OfferDuration = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Offers", x => x.OfferId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Offers");
        }
    }
}
