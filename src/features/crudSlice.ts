import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';

interface Item {
  id: number;
  name: string;
}

interface CrudState {
  items: Item[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CrudState = {
  items: [],
  status: 'idle',
};

export const fetchItems = createAsyncThunk('crud/fetchItems', async () => {
  const response = await apiClient.get('/items');
  return response.data;
});

export const addItem = createAsyncThunk('crud/addItem', async (item: Omit<Item, 'id'>) => {
  const response = await apiClient.post('/items', item);
  return response.data;
});

export const deleteItem = createAsyncThunk('crud/deleteItem', async (id: number) => {
  await apiClient.delete(`/items/${id}`);
  return id;
});

const crudSlice = createSlice({
  name: 'crud',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default crudSlice.reducer;
