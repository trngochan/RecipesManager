import { createSlice } from "@reduxjs/toolkit";

const recipeListSlice = createSlice({
  name: "recipeList", // Tên Slice, sẽ được sử dụng trong store
  initialState: [
    {
      name: "Phở",
      description: "Viet Nam",
      image:
        "https://th.bing.com/th/id/OIP.SE0fDsfV9PCeOvV1BhNUbAHaDt?pid=ImgDet&rs=1",
      ingredients: [
        { ingredient: "pho", quantity: "10" },
        { ingredient: "bun", quantity: 10 },
      ],
    },
  ],
  reducers: {
    addRecipe: (state, action) => {
      state.push(action.payload);
    },
    deleteRecipe: (state, action) => {
      state.splice(action.payload, 1);
    },
    updateRecipe: (state, action) => {
      state[action.payload.index] = action.payload.data;
    },
  },
});

export const { addRecipe, deleteRecipe, updateRecipe } =
  recipeListSlice.actions;
export default recipeListSlice.reducer;
