import { Flex, TextField, Button, View } from '@adobe/react-spectrum';

function TaskForm() {
  return (
    <Flex direction="row" gap="size-100" alignItems="end">
      <View flex>
        <TextField label="New Task" />
      </View>
      <Button variant="cta">Add Task</Button>
    </Flex>
  );
}

export default TaskForm;