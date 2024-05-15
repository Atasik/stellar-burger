import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';

interface IIngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
}

export const initialState: IIngredientsState = {
  ingredients: [],
  loading: false
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  getIngredientsApi
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.loading = false;
      });
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIsIngredientsLoading: (state) => state.loading
  }
});

export const { getIngredients, getIsIngredientsLoading } =
  ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
