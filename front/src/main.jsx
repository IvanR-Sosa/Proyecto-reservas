import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Header from "./pages/public/Header.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./pages/public/Footer.jsx";
import HotelCard from "./pages/hotel/HotelCard.jsx";
import AdminHome from "./pages/admin/AdminHome.jsx";
import Login from "./pages/public/Login.jsx";
import Register from "./pages/public/Register.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import Profile from "./pages/user/Profile.jsx"
import { ProtectedRoute } from "./routes/ProtectedRoute.jsx";
import ChangePassword from "./pages/user/ChangePassword.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/hotel_card/:id" element={<HotelCard />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          
          

          {/*Rutas protegidas */}
          <Route path="/Profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }></Route>
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
