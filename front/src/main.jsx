import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Header from "./pages/public/Header.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./pages/public/Footer.jsx";
import HotelCard from "./pages/hotel/HotelCard.jsx";
import AdminHome from "./pages/admin/AdminHome.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/hotel_card" element={<HotelCard />}></Route>
        <Route path="/admin" element={<AdminHome />} ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
);
