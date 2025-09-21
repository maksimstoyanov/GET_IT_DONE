using server.Data;

namespace server.GraphQL
{
    [ExtendObjectType("Query")]
    public class TaskQueries
    {
        public IQueryable<TaskEntity> GetTasks(AppDbContext context) =>
            context.Tasks.OrderByDescending(t => t.Id); 
    }
}
