using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace spaproject.Migrations
{
    /// <inheritdoc />
    public partial class AddOfferTypeToOffer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OfferType",
                table: "Offers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OfferType",
                table: "Offers");
        }
    }
}
