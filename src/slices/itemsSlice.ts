import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store/store'; // Adjust if necessary

interface Item {
  id: string;
  name: string;
}

interface ItemsState {
  items: Item[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ItemsState = {
  items: [],
  status: 'idle',
};

// Define your async thunk
export const addItem = createAsyncThunk<
  Item, // Return type of the payload creator
  Omit<Item, 'id'>, // First argument to the payload creator
  { state: RootState } // ThunkAPI configuration
>('items/addItem', async (newItem) => {
  const response = await fetch('/api/items', {
    method: 'POST',
    body: JSON.stringify(newItem),
  });
  return (await response.json()) as Item;
});

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addItem.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  },
});

export default itemsSlice.reducer;
