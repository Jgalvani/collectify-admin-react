import "./styles.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import User from "./pages/User/User";
import Color from "./pages/Color/Color";
import Car from "./pages/Car/Car";
import UserDetail from "./pages/UserDetail/UserDetail";
import CarDetail from "./pages/CarDetail/CarDetail";
import ColorDetail from "./pages/ColorDetail/ColorDetail";
import NotFound from "./pages/NotFound/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/car" element={<Car />} />
      <Route path="/car/detail/:id" element={<CarDetail />} />
      <Route path="/car/detail/" element={<CarDetail />} />
      <Route path="/color" element={<Color />} />
      <Route path="/color/detail/:id" element={<ColorDetail />} />
      <Route path="/color/detail/" element={<ColorDetail />} />
      <Route path="/user" element={<User />} />
      <Route path="/user/detail" element={<UserDetail />} />
      <Route path="/user/detail/:id" element={<UserDetail />} />
      <Route index element={<User />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
