using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace spaproject.Migrations
{
    /// <inheritdoc />
    public partial class AddOfferTypeToOffer2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OfferType",
                table: "Offers");

            migrationBuilder.AlterColumn<string>(
                name: "OfferName",
                table: "Offers",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "OfferImageUrl",
                table: "Offers",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "OfferDescription",
                table: "Offers",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<int>(
                name: "OfferTypeId",
                table: "Offers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "OfferTypes",
                columns: table => new
                {
                    OfferTypeId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OfferTypeName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OfferTypes", x => x.OfferTypeId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Offers_OfferTypeId",
                table: "Offers",
                column: "OfferTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Offers_OfferTypes_OfferTypeId",
                table: "Offers",
                column: "OfferTypeId",
                principalTable: "OfferTypes",
                principalColumn: "OfferTypeId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Offers_OfferTypes_OfferTypeId",
                table: "Offers");

            migrationBuilder.DropTable(
                name: "OfferTypes");

            migrationBuilder.DropIndex(
                name: "IX_Offers_OfferTypeId",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "OfferTypeId",
                table: "Offers");

            migrationBuilder.AlterColumn<string>(
                name: "OfferName",
                table: "Offers",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "OfferImageUrl",
                table: "Offers",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "OfferDescription",
                table: "Offers",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OfferType",
                table: "Offers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
