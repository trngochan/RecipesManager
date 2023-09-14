import { combineReducers } from "redux";
import RecipeListReducer from "./RecipeSlide";
import RecipeChoosedReducer from "./RecipeChoosedSilde";
const rootReducer = combineReducers({
  recipeList: RecipeListReducer, // Chỉ định Slice của bạn và tên trạng thái trong store
  recipeChoosed: RecipeChoosedReducer,
});

export default rootReducer;
