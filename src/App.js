import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Recipes from "./pages/Recipes";
import "./App.css";
import Header from "./components/Header";
import ShoppingList from "./pages/ShoppingList";
import RecipeBook from "./pages/RecipeBook";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path="*" element={<Navigate to="/recipes" replace />} /> */}
        <Route path="/recipes" element={<Recipes />}></Route>
        <Route path="/shopping-list/:id" element={<ShoppingList />}></Route>
        <Route path="/" element={<RecipeBook />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
