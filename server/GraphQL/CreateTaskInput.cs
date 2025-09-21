using server.Data;

namespace server.GraphQL
{
    public class CreateTaskInput
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Status Status { get; set; } = Status.PENDING;
    }
}
