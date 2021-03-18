using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ReversiMvcApp.DAL;
using ReversiMvcApp.Models;

namespace ReversiMvcApp.Views
{
    public class PlayerController : Controller
    {
        private readonly ReversiDbContext _context;

        public PlayerController(ReversiDbContext context)
        {
            _context = context;
        }
        
        // GET: Player
        public async Task<IActionResult> Index()
        {
            return View(await _context.Spelers.ToListAsync());
        }

        // GET: Player/Details/5
        public async Task<IActionResult> Details(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var speler = await _context.Spelers
                .FirstOrDefaultAsync(m => m.Guid == id);
            if (speler == null)
            {
                return NotFound();
            }

            return View(speler);
        }

        // GET: Player/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Player/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Guid,Naam,AantalGewonnen,AantalVerloren,AantalGelijk")] Speler speler)
        {
            if (ModelState.IsValid)
            {
                _context.Add(speler);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(speler);
        }

        // GET: Player/Edit/5
        public async Task<IActionResult> Edit(string id)
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

        // POST: Player/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(string id, [Bind("Guid,Naam,AantalGewonnen,AantalVerloren,AantalGelijk")] Speler speler)
        {
            if (id != speler.Guid)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(speler);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SpelerExists(speler.Guid))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(speler);
        }

        // GET: Player/Delete/5
        public async Task<IActionResult> Delete(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var speler = await _context.Spelers
                .FirstOrDefaultAsync(m => m.Guid == id);
            if (speler == null)
            {
                return NotFound();
            }

            return View(speler);
        }

        // POST: Player/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            var speler = await _context.Spelers.FindAsync(id);
            _context.Spelers.Remove(speler);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool SpelerExists(string id)
        {
            return _context.Spelers.Any(e => e.Guid == id);
        }
    }
}
