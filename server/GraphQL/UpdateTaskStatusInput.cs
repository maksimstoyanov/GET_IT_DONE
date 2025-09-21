using server.Data;

namespace server.GraphQL
{
    public class UpdateTaskStatusInput
    {
        public required int Id { get; set; }
        public required Status Status { get; set; }
    }
}