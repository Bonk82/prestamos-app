
import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "./supabase/client";
import './App.css'
import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import Prestamo from "./pages/Prestamo";
import Dashboard from "./pages/Dashboard";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prestamo" element={<Prestamo />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App
