import { configureStore, createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  theme: 'light',
};

// Slice = state + actions + reducer
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

// Export action
export const { toggleTheme } = themeSlice.actions;

// Create store
const store = configureStore({
  reducer: themeSlice.reducer,
});

// Access state
console.log('Initial State:', store.getState());

// Subscribe
const unsubscribe = store.subscribe(() => {
  console.log('Updated State:', store.getState());
});

// Dispatch action
store.dispatch(toggleTheme());

// Unsubscribe
unsubscribe();
