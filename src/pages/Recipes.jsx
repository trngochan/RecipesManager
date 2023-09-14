import { useState } from "react";
import Button from "@mui/material/Button";
import FormAddRecipes from "../components/FormAddRecipe";
import CardRecipe from "../components/CardRecipe";
import Recipedetails from "../components/RecipeDetails";
import { useSelector, useDispatch } from "react-redux";
import { changeRecipeChoosed } from "../store/RecipeChoosedSilde";

function Recipes() {
  const repices = useSelector((state) => state.recipeList);
  const dispatch = useDispatch();
  const [blockAppear, setBlockAppear] = useState("");
  function handleChangeApper(value) {
    setBlockAppear(value);
  }

  const [indexRecipeChoosed, setIndexRecipeChoosed] = useState();
  function hanldeChangeRecipeActice(item, index) {
    dispatch(changeRecipeChoosed(item));
    setIndexRecipeChoosed(index);
  }

  const [editRecipeChoosed, setEditRecipeChoosed] = useState(false);
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-4">
          <div className="col-lg-12 col-md-12">
            <Button
              variant="contained"
              color="success"
              className="mt-4"
              onClick={() => {
                handleChangeApper("addrecipe");
                setEditRecipeChoosed(false);
              }}
            >
              New Recipe
            </Button>
          </div>
          <div className="col-lg-12 col-md-12">
            {repices.map((item, index) => (
              <CardRecipe
                data={item}
                key={index}
                onClick={() => {
                  handleChangeApper("recipedetails");
                  hanldeChangeRecipeActice(item, index);
                }}
              />
            ))}
          </div>
        </div>
        <div className="col-lg-8 col-md-8">
          {blockAppear === "addrecipe" ? (
            <FormAddRecipes
              editRecipeChoosed={editRecipeChoosed}
              indexRecipeChoosed={indexRecipeChoosed}
            />
          ) : blockAppear === "recipedetails" ? (
            <Recipedetails
              index={indexRecipeChoosed}
              handleChangeApper={handleChangeApper}
              setEditRecipeChoosed={setEditRecipeChoosed}
              indexRecipeChoosed={indexRecipeChoosed}
            />
          ) : (
            <h2 className="mt-4">Please select a Recipe!</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default Recipes;
