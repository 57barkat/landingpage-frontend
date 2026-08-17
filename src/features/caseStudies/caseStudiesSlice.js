import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCaseStudies as fetchCaseStudiesApi } from './caseStudiesApi';

export const fetchCaseStudies = createAsyncThunk(
  'caseStudies/fetchCaseStudies',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCaseStudiesApi();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filters: {
    category: 'All',
    query: ''
  }
};

const caseStudiesSlice = createSlice({
  name: 'caseStudies',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.filters.category = action.payload;
    },
    setQuery(state, action) {
      state.filters.query = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCaseStudies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCaseStudies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCaseStudies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { setCategory, setQuery } = caseStudiesSlice.actions;
export default caseStudiesSlice.reducer;
