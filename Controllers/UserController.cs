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
        
            private readonly MyContext _context;
            public UserController(MyContext context)
            {
                _context = context;
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

            [HttpPost("create")]
            public async Task<IActionResult> CreateUser([FromBody] User newUser)
            {
                if (newUser == null)
                {
                    return BadRequest("Invalid user data.");
                }

                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();

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

        
    }
}
