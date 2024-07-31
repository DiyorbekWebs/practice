import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../slices/todoSlice';
import { RootState, AppDispatch } from '../store/store';

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, status } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Todo List</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error loading todos</p>}
      {status === 'idle' && (
        <ul className="space-y-2">
          {todos.map(todo => (
            <li key={todo.id} className="border-b py-2">
              {todo.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardPage;
