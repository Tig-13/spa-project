using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpaProject.Db;
using SpaProject.Models;

namespace SpaProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : Controller
{
        private readonly MyContext _context;
        public TestController(MyContext context)
        {  
            _context = context;
        }

        [HttpGet("")]
        public IActionResult Index()
        {
            return Ok("Hello from TestController");
        }


        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            
            var users = await _context.Users.ToListAsync(); 
            if (users.Count == 0)
            {
                var user = new User { Password = "123", Username = "123", Role = "User" };
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            };
            return Ok(users);
        }
    }
}
