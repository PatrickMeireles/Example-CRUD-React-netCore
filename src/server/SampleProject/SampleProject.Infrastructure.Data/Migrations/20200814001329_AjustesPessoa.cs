using Microsoft.EntityFrameworkCore.Migrations;

namespace SampleProject.Infrastructure.Data.Migrations
{
    public partial class AjustesPessoa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Pessoas_IdCidade",
                table: "Pessoas");

            migrationBuilder.CreateIndex(
                name: "IX_Pessoas_IdCidade",
                table: "Pessoas",
                column: "IdCidade");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Pessoas_IdCidade",
                table: "Pessoas");

            migrationBuilder.CreateIndex(
                name: "IX_Pessoas_IdCidade",
                table: "Pessoas",
                column: "IdCidade",
                unique: true);
        }
    }
}
