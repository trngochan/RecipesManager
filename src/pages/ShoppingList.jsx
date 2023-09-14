import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  addIngredient,
  deleteIngredient,
  updateIngredient,
} from "../store/RecipeChoosedSilde";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateRecipe } from "../store/RecipeSlide";

function ShoppingList() {
  const Recipedetails = useSelector((state) => state.recipeChoosed);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [changeModeupdate, setChangeModeupdate] = useState("add");
  if (!Recipedetails) {
    navigate("/recipes");
  }

  const { id } = useParams();

  const validationSchema = Yup.object().shape({
    ingredient: Yup.string().required("Ingredient is required"),
    quantity: Yup.number().required("Quantity is required"),
  });

  const formik = useFormik({
    initialValues: {
      ingredient: "",
      quantity: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (changeModeupdate === "add") dispatch(addIngredient(values));
      else {
        dispatch(
          updateIngredient({
            index: indexIngreChoosed,
            data: values,
          })
        );
      }
      formik.resetForm();
      setChangeModeupdate("add");
    },
  });

  const [indexIngreChoosed, setIndexIngreChoosed] = useState();
  function handleChooseIngre(item, index) {
    formik.setFieldValue("ingredient", item.ingredient);
    formik.setFieldValue("quantity", item.quantity);
    setChangeModeupdate("edit");
    setIndexIngreChoosed(index);
  }

  function handleCancel() {
    formik.resetForm();
    setChangeModeupdate("add");
  }

  function handleDelete() {
    dispatch(
      deleteIngredient({
        index: indexIngreChoosed,
      })
    );
    formik.resetForm();
    setChangeModeupdate("add");
    setIndexIngreChoosed();
  }

  useEffect(() => {
    dispatch(
      updateRecipe({
        index: id,
        data: Recipedetails,
      })
    );
  }, [Recipedetails]);

  return (
    <div className="container mt-4">
      <div className="col-lg-12">
        <form>
          <div className="row">
            <div className="col-lg-5 col-md-5">
              <TextField
                fullWidth
                label="Ingredient"
                name="ingredient"
                value={formik.values.ingredient}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.ingredient && Boolean(formik.errors.ingredient)
                }
                helperText={
                  formik.touched.ingredient && formik.errors.ingredient
                }
              />
            </div>

            <div className="col-lg-5 col-md-5">
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.quantity && Boolean(formik.errors.quantity)
                }
                helperText={formik.touched.quantity && formik.errors.quantity}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-lg-6"></div>
            <div className="col-lg-4">
              {changeModeupdate === "add" ? (
                <div className="row">
                  <div className="col-lg-4"></div>
                  <div className="col-lg-3">
                    <Button
                      onClick={formik.handleSubmit}
                      variant="contained"
                      color="success"
                    >
                      Save
                    </Button>
                  </div>
                  <div className="col-lg-3">
                    <Button
                      onClick={formik.resetForm}
                      variant="contained"
                      color="error"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-lg-4">
                    <Button
                      onClick={formik.handleSubmit}
                      variant="outlined"
                      color="success"
                    >
                      Update
                    </Button>
                  </div>
                  <div className="col-lg-4">
                    <Button
                      onClick={() => {
                        handleDelete();
                      }}
                      variant="outlined"
                      color="primary"
                    >
                      Delete
                    </Button>
                  </div>
                  <div className="col-lg-4">
                    <Button
                      onClick={handleCancel}
                      variant="outlined"
                      color="error"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
      <div className="col-lg-12">
        <table className="table table-triped">
          <thead>
            <tr>
              <th scope="col">Ingredient</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {Recipedetails.ingredients.map((item, index) => (
              <tr key={index}>
                <td
                  onClick={() => {
                    handleChooseIngre(item, index);
                  }}
                >
                  {item.ingredient}
                </td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShoppingList;
