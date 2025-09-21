using Microsoft.EntityFrameworkCore;

namespace server.Data
{
    public enum Status
    {
        PENDING,
        COMPLETED
    }

    public class TaskEntity
    {
        public int Id { get; set; }  // Primary key
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Status Status { get; set; } = Status.PENDING;
    }

    // EF Core database context
    public class AppDbContext : DbContext
    {
        public DbSet<TaskEntity> Tasks { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }
    }
}