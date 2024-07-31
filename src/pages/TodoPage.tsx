import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setTodos, addTodo, editTodo, deleteTodo } from '../slices/todoSlice';
import { Button, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
});

type FormData = z.infer<typeof schema>;

const TodoPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const { control, handleSubmit, reset, setValue } = useForm<FormData>({
    defaultValues: {
      title: '',
    },
  });

  const [editingTodo, setEditingTodo] = useState<number | null>(null);

  useEffect(() => {
    // Fetch todos from the API
    fetch('https://dummyjson.com/todos')
      .then(response => response.json())
      .then(data => dispatch(setTodos(data.todos)));
  }, [dispatch]);

  const onSubmit = (data: FormData) => {
    if (editingTodo !== null) {
      dispatch(editTodo({ id: editingTodo, title: data.title }));
    } else {
      const newTodo = { id: Date.now(), title: data.title };
      dispatch(addTodo(newTodo));
    }
    reset();
    setEditingTodo(null);
  };

  const handleEdit = (id: number, title: string) => {
    setEditingTodo(id);
    setValue('title', title);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Todos</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <Controller
          name="title"
          control={control}
          render={({ field }) => <TextField {...field} label="Todo Title" variant="outlined" fullWidth margin="normal" />}
          rules={{ required: true }}
        />
        <Button type="submit" variant="contained" color="primary">
          {editingTodo ? 'Update Todo' : 'Add Todo'}
        </Button>
      </form>
      <List>
        {todos.map(todo => (
          <ListItem key={todo.id} className="mb-2">
            <ListItemText primary={todo.title} />
            <IconButton onClick={() => handleEdit(todo.id, todo.title)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(todo.id)} color="secondary">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TodoPage;
