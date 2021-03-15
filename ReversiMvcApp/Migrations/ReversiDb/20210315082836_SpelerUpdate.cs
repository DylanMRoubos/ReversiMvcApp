using Microsoft.EntityFrameworkCore.Migrations;

namespace ReversiMvcApp.Migrations.ReversiDb
{
    public partial class SpelerUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SpelerRol",
                table: "Spelers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Game",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlayerToken1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlayerToken2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Winner = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Finished = table.Column<bool>(type: "bit", nullable: false),
                    CurrentPlayer = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Game", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Game");

            migrationBuilder.DropColumn(
                name: "SpelerRol",
                table: "Spelers");
        }
    }
}
