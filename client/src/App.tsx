import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import FoodList from "./components/Display/FoodList";
import RequiredAuth from "./components/Forms/Auth/RequiredAuth";
import AddFoodForm from "./components/Forms/Food/AddFoodForm";
import Login from "./components/Forms/Auth/Login";
import Register from "./components/Forms/Auth/Register";
import FoodDetails from "./components/Display/FoodDetails";
import EditFood from "./components/Display/EditFood";
import Hero from "./components/Hero";
import Profile from "./components/Forms/Auth/Profile";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<RequiredAuth />}>
          <Route path="/add_food" element={<AddFoodForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/food/:id" element={<FoodDetails />} />
          <Route path="/food/edit/:id" element={<EditFood />} />
        </Route>

        {/* Food List (Public) */}
        <Route path="/food" element={<FoodList />} />
      </Route>
    </Routes>
  );
}
