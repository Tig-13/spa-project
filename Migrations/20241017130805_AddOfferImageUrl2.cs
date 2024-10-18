using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace spaproject.Migrations
{
    /// <inheritdoc />
    public partial class AddOfferImageUrl2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OfferImageUrl",
                table: "Offers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OfferImageUrl",
                table: "Offers");
        }
    }
}
