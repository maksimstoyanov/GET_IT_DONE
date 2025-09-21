using server.Data;
using HotChocolate.Types;

namespace server.GraphQL
{
    [ExtendObjectType("Mutation")]
    public class TaskMutations
    {
        public async Task<TaskEntity> CreateTask(
            CreateTaskInput input,
            AppDbContext context)
        {
            var entity = new TaskEntity
            {
                Title = input.Title,
                Description = input.Description,
                Status = input.Status
            };

            context.Tasks.Add(entity);
            await context.SaveChangesAsync();
            return entity;
        }

        public async Task<TaskEntity> UpdateTaskStatus(
            UpdateTaskStatusInput input,
            AppDbContext context)
        {
            var entity = await context.Tasks.FindAsync(input.Id);
            if (entity is null){
                return null; // Return null if the task isn't found
            }

            if (entity.Status != input.Status){
                entity.Status = input.Status;
            }

            await context.SaveChangesAsync();
            return entity;
        }

    }
}