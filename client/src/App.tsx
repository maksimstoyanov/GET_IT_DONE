import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { Provider, defaultTheme, Flex, View, Heading, Text, Checkbox, TextField, Button, DialogTrigger, AlertDialog, ActionButton } from '@adobe/react-spectrum';


// GraphQL Queries and Mutations
const GET_TASKS = gql`
  query GetTasks {
    tasks {
    id
    title
    description
    status
  }
}
`;

const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      status
    }
  }
`;

// Defines the GraphQL mutation for updating an existing task.
const UPDATE_TASK_STATUS = gql`
  mutation UpdateTaskStatus($input: UpdateTaskStatusInput!) {
    updateTaskStatus(input: $input) {
      id
      status
    }
  }
`;

type Status = "PENDING" | "COMPLETED";

interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
}

interface GetTasksQuery {
   tasks: Task[];
}

const App = () => {
  // Now we explicitly type the data returned by useQuery.
  const { data, loading, error, refetch } = useQuery<GetTasksQuery>(GET_TASKS);

  
  const [createTask, { loading: creating }] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });
  
  const [updateTask] = useMutation(UPDATE_TASK_STATUS, {
    refetchQueries: [{ query: GET_TASKS }],
  });
  
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');


  const handleCreateTask = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!newTaskTitle.trim() || !newTaskDescription.trim()) {
    return;
  }

  try {
    await createTask({
      variables: {
        input: {
          title: newTaskTitle,
          description: newTaskDescription,
          status: 'PENDING' as Status,
        },
      },
      awaitRefetchQueries: true,
    });
    
    // Clear the text fields ONLY after a successful task creation
    setNewTaskTitle('');
    setNewTaskDescription('');

  } catch (err) {
    console.error(err);
  }
};

const handleToggleComplete = async (task: Task) => {
  await updateTask({
    variables: {
      input: {
        id: task.id,
        status: (task.status === "COMPLETED" ? "PENDING" : "COMPLETED") as Status,
      },
    },
  });
};

  if (loading) {
    return (
      <Provider theme={defaultTheme}>
        <View padding="size-250">
          <Text>Loading tasks...</Text>
        </View>
      </Provider>
    );
  }

  if (error) {
    return (
      <Provider theme={defaultTheme}>
        <View padding="size-250">
          <Text>Error: {error.message}</Text>
        </View>
      </Provider>
    );
  }

return (
  <Provider theme={defaultTheme}>
    <View padding="size-250" maxWidth="800px" margin="0 auto">
      <Flex direction="column" gap="size-200">
        <Heading level={1}>Get It Done!</Heading>

        {/* Task Creation Form */}
        <form onSubmit={handleCreateTask}>
          <Flex direction="row" gap="size-100" alignItems="end">
            <TextField
              label="Task Name"
              flex
              value={newTaskTitle}
              onChange={setNewTaskTitle}
            />
            <TextField
              label="Details"
              flex
              value={newTaskDescription}
              onChange={setNewTaskDescription}
            />
            <Button type="submit" variant="cta" isDisabled={creating}>
              {creating ? 'Adding...' : 'Add Task'}
            </Button>
          </Flex>
        </form>

        {/* Task List */}
        <View>
          <Heading level={2}>Tasks</Heading>
          {data?.tasks.map((task: Task) => (
            <View
              key={task.id}
              borderWidth="thin"
              borderColor="dark"
              borderRadius="medium"
              padding="size-150"
              marginBottom="size-100"
            >
              <Flex alignItems="center" justifyContent="space-between" gap="size-200" flex="1">
                <Checkbox
                  isSelected={task.status === "COMPLETED"}
                  onChange={(isSelected) => handleToggleComplete(task)}
                >
                  <Text UNSAFE_style={{ fontWeight: 'bold' }}>
                    {task.title}
                  </Text>
                </Checkbox>
              </Flex>

              {task.description && (
                <View
                  borderRadius="small"
                  padding="size-100"
                  marginTop="size-100"
                  backgroundColor="gray-50" // Added background color
                >
                  <Text UNSAFE_style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {task.description}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </Flex>
    </View>
  </Provider>
);
};

export default App;
