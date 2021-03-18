using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReversiMvcApp.DAL;
using ReversiMvcApp.Data;
using ReversiMvcApp.Helpers;
using ReversiMvcApp.Models;

namespace ReversiMvcApp.Controllers
{
    [Authorize(Roles ="Admin, Mediator")]
    public class AccountController : Controller
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ReversiDbContext _context;
        private readonly ApplicationDbContext _dbContext;
        private ReversiApiContext _apiContext;
        public ReversiApiContext apiContext
        {
            get
            {
                if (_apiContext == null)
                {
                    ClaimsPrincipal currentUser = this.User;
                    _apiContext = new ReversiApiContext(currentUser.FindFirst(ClaimTypes.NameIdentifier).Value);
                }
                return _apiContext;
            }
        }

        public AccountController(ReversiDbContext reversiDb, RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> usermanager, ApplicationDbContext dbContext)
        {
            _roleManager = roleManager;
            _userManager = usermanager;
            _context = reversiDb;
            _dbContext = dbContext;
        }

        // GET: Account
        public async Task<ActionResult> IndexAsync()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);
            var role = await _userManager.GetRolesAsync(user);

            if (role[0] == "Mediator")
            {
                return View("MediatorIndex", await _context.Spelers.ToListAsync());
            }

            return View(await _context.Spelers.ToListAsync());
        }

        public async Task<ActionResult> IndexAdminAsync()
        {
            return View(await _context.Spelers.ToListAsync());
        }

        // GET: Account/Edit/5
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> EditAsync(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var speler = await _context.Spelers.FindAsync(id);
            if (speler == null)
            {
                return NotFound();
            }
            return View(speler);
        }

        // POST: Account/Edit/5        
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> EditAsync(string id, [Bind("Role")] Speler speler)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var user = await _userManager.FindByIdAsync(id);

                    //Get all roles from user
                    var roles = await _userManager.GetRolesAsync(user);
                    //Remove all roles from user
                    await _userManager.RemoveFromRolesAsync(user, roles.ToArray());

                    //Add new role to user
                    await _userManager.AddToRoleAsync(user, speler.Role);
                }
                catch (DbUpdateConcurrencyException)
                {
                }
                return RedirectToAction(nameof(Index));
            }
            return View(speler);
        }

        //TODO: check that previous user is deleted
        // GET: Player/Delete/5
        public async Task<IActionResult> Delete(string id)
        {
            if (id == null)
            {
                return NotFound();
            }
            //Remove game if player is added to one
            try
            {
                var game = await _context.Game.FirstOrDefaultAsync(G => G.PlayerToken1 == id || G.PlayerToken2 == id);
                _context.Game.Remove(game);
                var response = apiContext.DeleteRequest("/api/spel/" + game.Token);
            }
            catch (Exception e) { }

            var speler = await _context.Spelers
               .FirstOrDefaultAsync(m => m.Guid == id);

            //Remove from context
            var user = await _userManager.FindByIdAsync(id);
            await _userManager.DeleteAsync(user);

            _context.Spelers.Remove(speler);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }
    }
}