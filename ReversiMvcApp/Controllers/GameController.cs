using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ReversiMvcApp.DAL;
using ReversiMvcApp.Data;
using ReversiMvcApp.Models;

namespace ReversiMvcApp.Controllers
{
    [Authorize]
    public class GameController : Controller
    {
        private readonly ReversiDbContext _reversiDb;
        private ReversiApiContext _context;
        private readonly ILogger _logger;

        public ReversiApiContext Context { get
            {
                if(_context == null)
                {
                    ClaimsPrincipal currentUser = this.User;
                    _context = new ReversiApiContext(currentUser.FindFirst(ClaimTypes.NameIdentifier).Value);
                }
                return _context;
            }
        }
        public GameController(ReversiDbContext reversiDb, ILogger<GameController> logger)
        {
            _logger = logger;
            _reversiDb = reversiDb;
        }

        // GET: Game
        public IActionResult Index()
        {
            if (Context.PlayerHasActiveGame())
            {
                return RedirectToAction("Details", new { id = Context.GetPlayerCurrentGame() });
            }

            _logger.LogInformation($"Game - Index page visited at { DateTime.UtcNow.ToLongTimeString()}");
            HttpResponseMessage response = Context.GetRequest("/api/spel");

            if (response.IsSuccessStatusCode)
            {
                var responeList = JsonConvert.DeserializeObject<List<Game>>(response.Content.ReadAsStringAsync().Result);
                return View(responeList);
            }

            return View();

        }
        // GET: Game/Details/5
        public IActionResult Details(string id)
        {
            if (id == null)
            {
                return NotFound();
            }
            HttpResponseMessage response = Context.GetRequest("/api/spel/" + id);

            if (response.IsSuccessStatusCode)
            {
                var responseGame = JsonConvert.DeserializeObject<Game>(response.Content.ReadAsStringAsync().Result);
                return View(responseGame);
            }

            return View();
        }

        // GET: Game/Create
        public IActionResult Create()
        {
            if (Context.PlayerHasActiveGame())
            {
                return RedirectToAction("Details", new { id = Context.GetPlayerCurrentGame() });
            }
            return View();
        }

        // POST: Game/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create([Bind("Description")] Game game)
        {
            //GET current user ID
            ClaimsPrincipal currentUser = this.User;
            game.PlayerToken1 = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;

            var response = Context.PostRequest("/api/spel", game);
            if(response.IsSuccessStatusCode)
            {
                return RedirectToAction("Details", new { id = Context.GetPlayerCurrentGame() });
            }
            return View();

            
        }

        //Game/Delete/{id}
        public IActionResult Delete(string token, string winnerToken, string loserToken, bool draw)
        {
            var response = Context.DeleteRequest("/api/spel/" + token);

            if(response.IsSuccessStatusCode)
            {
                if (draw)
                {
                    //Set a draw on both accounts
                    var player1 = _reversiDb.Spelers.First(s => s.Guid == loserToken);
                    var player2 = _reversiDb.Spelers.First(s => s.Guid == winnerToken);
                    player1.AantalGelijk++;
                    player2.AantalGelijk++;
                    _reversiDb.SaveChanges();
                    return RedirectToAction("Index");
                }

                var loser = _reversiDb.Spelers.First(s => s.Guid == loserToken);
                loser.AantalVerloren++;
                var winner = _reversiDb.Spelers.First(s => s.Guid == winnerToken);
                winner.AantalGewonnen++;
                _reversiDb.SaveChanges();

            }

            return RedirectToAction("Index");
        }
    }
}
