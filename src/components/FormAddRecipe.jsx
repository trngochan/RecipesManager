import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DeleteSweepSharpIcon from "@mui/icons-material/DeleteSweepSharp";
import { IconButton, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe, updateRecipe } from "../store/RecipeSlide";
import { changeRecipeChoosed } from "../store/RecipeChoosedSilde";

function FormAddRecipe({ editRecipeChoosed, indexRecipeChoosed }) {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    image: Yup.string().url("Invalid URL").required("Image URL is required"),
    description: Yup.string().required("Description is required"),
    ingredients: Yup.array().of(
      Yup.object().shape({
        ingredient: Yup.string().required("Ingredient is required"),
        quantity: Yup.number()
          .typeError("Quantity must be a number")
          .positive("Quantity must be positive")
          .integer("Quantity must be an integer")
          .required("Quantity is required"),
      })
    ),
  });

  var data = useSelector((state) => state.recipeChoosed);

  useEffect(() => {
    if (editRecipeChoosed === false) {
      formik.setValues({
        name: "",
        image: "",
        description: "",
        ingredients: [],
      });
    }
  }, [editRecipeChoosed]);

  const initState = editRecipeChoosed
    ? data
    : {
        name: "",
        image: "",
        description: "",
        ingredients: [],
      };

  const formik = useFormik({
    initialValues: initState,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Xử lý khi biểu mẫu được gửi đi
      if (editRecipeChoosed) {
        dispatch(changeRecipeChoosed(values));
        dispatch(
          updateRecipe({
            index: indexRecipeChoosed,
            data: values,
          })
        );
      } else {
        dispatch(addRecipe(values));
        formik.resetForm();
      }
    },
  });

  const handleAddIngre = () => {
    formik.setFieldValue("ingredients", [
      ...formik.values.ingredients,
      { ingredient: "", quantity: "" },
    ]);
  };

  const handleDeleteIngre = (index) => {
    const updatedIngredients = [...formik.values.ingredients];
    updatedIngredients.splice(index, 1);
    formik.setFieldValue("ingredients", updatedIngredients);
  };

  const handleCancel = () => {
    formik.resetForm();
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        <h2>Add Recipe</h2>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={handleCancel} variant="contained" color="error">
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
            />
          </Grid>
          {formik.values.image ? (
            <Grid item xs={4}>
              <Box
                component="img"
                sx={{
                  height: 233,
                  width: 350,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                alt="The image."
                src={formik.values.image}
              />
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>
          <Grid item xs={12}>
            {formik.values.ingredients.map((ingredient, index) => (
              <Grid container spacing={2} key={index} marginTop={1}>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label="Ingredient"
                    name={`ingredients[${index}].ingredient`}
                    value={ingredient.ingredient}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.ingredients &&
                      formik.touched.ingredients[index] &&
                      Boolean(formik.errors.ingredients?.[index]?.ingredient)
                    }
                    helperText={
                      formik.touched.ingredients &&
                      formik.touched.ingredients[index] &&
                      formik.errors.ingredients?.[index]?.ingredient
                    }
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    name={`ingredients[${index}].quantity`}
                    value={ingredient.quantity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.ingredients &&
                      formik.touched.ingredients[index] &&
                      Boolean(formik.errors.ingredients?.[index]?.quantity)
                    }
                    helperText={
                      formik.touched.ingredients &&
                      formik.touched.ingredients[index] &&
                      formik.errors.ingredients?.[index]?.quantity
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={() => handleDeleteIngre(index)}>
                    <DeleteSweepSharpIcon color="error" />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="success"
              onClick={handleAddIngre}
            >
              Add Ingredient
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default FormAddRecipe;
