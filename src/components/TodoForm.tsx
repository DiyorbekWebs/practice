import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { addTodo } from '../slices/todoSlice';
import { AppDispatch } from '../store/store';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
});

type FormData = z.infer<typeof schema>;

const TodoForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(addTodo({ title: data.title, completed: false }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register('title')}
        placeholder="Todo title"
        className="border p-2 rounded"
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
