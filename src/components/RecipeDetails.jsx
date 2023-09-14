import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe } from "../store/RecipeSlide";
import { changeRecipeChoosed } from "../store/RecipeChoosedSilde";

function Recipedetails({
  index,
  handleChangeApper,
  setEditRecipeChoosed,
  indexRecipeChoosed,
}) {
  const recipeChoosed = useSelector((state) => state.recipeChoosed);
  const dispatch = useDispatch();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
            margin: "auto",
          }}
          alt="The image."
          src={recipeChoosed.image}
        />
      </Grid>
      <Grid item xs={12}>
        <h2>{recipeChoosed.name}</h2>
      </Grid>
      <Grid item xs={5}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Manager recipe</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          >
            <MenuItem>
              <Link
                to={{
                  pathname: `/shopping-list/${indexRecipeChoosed}`,
                }}
              >
                Go to ShoppingList
              </Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleChangeApper("addrecipe");
                setEditRecipeChoosed(true);
              }}
            >
              Edit recipe
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(deleteRecipe(index));
                handleChangeApper("");
                dispatch(changeRecipeChoosed({}));
              }}
            >
              Delete recipe
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <h2>{recipeChoosed?.description}</h2>
        <h2>Ingredients: </h2>
      </Grid>
      <Grid item xs={12} marginLeft={2}>
        {recipeChoosed?.ingredients.map((item) => (
          <p>
            + {item.ingredient} - {item.quantity}
          </p>
        ))}
      </Grid>
    </Grid>
  );
}

export default Recipedetails;
