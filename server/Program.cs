using Microsoft.EntityFrameworkCore;
using server.Data;
using server.GraphQL;
using Microsoft.AspNetCore.Cors.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
// Register EF Core with SQLite


// Use SQLite in container
var dbPath = System.IO.Path.Combine(AppContext.BaseDirectory, "data", "tasks.db"); 
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite($"Data Source={dbPath}"));




builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDev", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // only needed if you use cookies
    });
});

// Register GraphQL Server
builder.Services
    .AddGraphQLServer()
    .AddQueryType(d => d.Name("Query"))
        .AddTypeExtension<TaskQueries>()     // your query resolvers
    .AddMutationType(d => d.Name("Mutation"))
        .AddTypeExtension<TaskMutations>()   // your mutation resolvers
    .AddProjections()
    .AddFiltering()
    .AddSorting();



builder.WebHost.ConfigureKestrel(options =>
{
    // Listen on all IPv4 and IPv6 addresses
    options.ListenAnyIP(5000); // 0.0.0.0
    //options.ListenAnyIP(5000, listenOptions => listenOptions.UseHttps(false)); // optional
});
var app = builder.Build();
// Apply migrations automatically inside the container
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}
app.UseCors("AllowFrontend");
app.UseCors("AllowReactDev");

// Map GraphQL endpoints
app.MapGraphQL();

app.Run();
