using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ReversiMvcApp.DAL;
using ReversiMvcApp.Models;

namespace ReversiMvcApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ReversiDbContext _reversiDb;
        private readonly UserManager<IdentityUser> _userManager;

        public HomeController(ILogger<HomeController> logger, ReversiDbContext reversiDb, UserManager<IdentityUser> userManager)
        {
            _logger = logger;
            _reversiDb = reversiDb;
            _userManager = userManager;
        }

        //TODO: Add a null check instead of try catch
        public async Task<IActionResult> IndexAsync()
        {   
            //Check if player already has record
            ClaimsPrincipal currentUser = this.User;

            var claimcurrentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier);
            var currentUserID = (claimcurrentUserID == null ? string.Empty : claimcurrentUserID.Value);

            if(currentUserID != "") {
                if (!_reversiDb.Spelers.Any(s => s.Guid == currentUserID))
                {
                    _reversiDb.Spelers.Add(new Speler() { Guid = currentUserID, Naam =  currentUser.Identity.Name});
                    var currentIdentityUser = await _userManager.GetUserAsync(User);
                    await _userManager.AddToRoleAsync(currentIdentityUser, "Player");
                    _reversiDb.SaveChanges();
                }
            }
                                          
            return View();
        }
        [Authorize]
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
