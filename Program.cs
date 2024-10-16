using SpaProject.Db;
using Microsoft.EntityFrameworkCore;
using Vite.AspNetCore; 
using Microsoft.Extensions.Configuration;

 var builder = WebApplication.CreateBuilder(args);
var Configuration = builder.Configuration;
 builder.Services.AddDbContext<MyContext>(options =>
options.UseSqlite(Configuration.GetConnectionString("TestDb")));


// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddControllers();

// Add the Vite services.
builder.Services.AddViteServices(options =>
{
    options.Server.AutoRun = true;
    options.Server.Https = true;
    options.Server.UseReactRefresh = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();


app.UseAuthorization();

app.MapRazorPages();
app.MapControllers();
app.MapFallbackToPage("/client");


if (app.Environment.IsDevelopment())
{
    app.UseWebSockets();
    // Use Vite Dev Server as middleware.
    app.UseViteDevelopmentServer(true);
}

app.Run();
