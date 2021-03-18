using Microsoft.EntityFrameworkCore.Migrations;

namespace ReversiMvcApp.Migrations.ReversiDb
{
    public partial class UpdateUserWithRole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SpelerRol",
                table: "Spelers",
                newName: "Role");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Role",
                table: "Spelers",
                newName: "SpelerRol");
        }
    }
}
