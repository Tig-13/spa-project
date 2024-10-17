using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpaProject.Db;
using SpaProject.Models;

namespace SpaProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly ILogger<UserController> _logger;
        private readonly MyContext _context;
        public UserController(MyContext context, ILogger<UserController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(user);
        }

        [HttpPost("create/{isInitialSetup}")]
        public async Task<IActionResult> CreateUser([FromBody] User newUser, bool isInitialSetup = false)
        {
            if (newUser == null)
            {
                return BadRequest("Invalid user data.");
            }

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            if (isInitialSetup)
            {
                _logger.LogInformation("Admin created: Username: {Username}, Password: {Password}", newUser.Username, newUser.Password);
            }


            return Ok(newUser);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            user.Username = updatedUser.Username;
            user.Password = updatedUser.Password;
            user.Role = updatedUser.Role;

            await _context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok("User deleted.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User model)
        {
            if (string.IsNullOrEmpty(model.Username) || string.IsNullOrEmpty(model.Password))
            {
                return BadRequest(new { message = "Username and password are required" });
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.Username && u.Password == model.Password);

            if (user == null)
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            return Ok(new
            {
                id = user.Id,
                username = user.Username,
                role = user.Role
            });
        }

        [HttpGet("check-admin")]
        public async Task<IActionResult> CheckAdmin()
        {
            var admin = await _context.Users.FirstOrDefaultAsync(u => u.Role == "Admin");

            if (admin == null)
            {
                return NotFound("Admin not found.");
            }

            return Ok(admin);
        }



    }
}
