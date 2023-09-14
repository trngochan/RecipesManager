import { createSlice } from "@reduxjs/toolkit";

const RecipeChoosedSilde = createSlice({
  name: "recipeChoosed",
  initialState: {},
  reducers: {
    changeRecipeChoosed: (state, action) => {
      return action.payload;
    },
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
    updateIngredient: (state, action) => {
      state.ingredients[action.payload.index] = action.payload.data;
    },
    deleteIngredient: (state, action) => {
      state.ingredients.splice(action.payload.index, 1);
    },
  },
});

export const {
  changeRecipeChoosed,
  addIngredient,
  updateIngredient,
  deleteIngredient,
} = RecipeChoosedSilde.actions;
export default RecipeChoosedSilde.reducer;
