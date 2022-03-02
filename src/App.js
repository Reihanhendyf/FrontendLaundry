import React from "react";
import Transaksi from "./pages/Transaksi";
import FormTransaksi from "./pages/FormTransaksi";
import Paket from "./pages/Paket";
import NotFound from "./NotFound";
import Member from "./pages/Member";
import Login from "./pages/Login";
import Footer from "./footer";
import Dashboard from "./pages/Dashboard";
import Navbar from "./Navbar";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navbar>
              <Dashboard />
            </Navbar>
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/Member"
          element={
            <Navbar>
              <Member />
            </Navbar>
          }
        />
        <Route
          path="/Paket"
          element={
            <Navbar>
              <Paket />
            </Navbar>
          }
        />
        <Route
          path="/Transaksi"
          element={
            <Navbar>
              <Transaksi />
            </Navbar>
          }
        />
        <Route
          path="/FormTransaksi"
          element={
            <Navbar>
              <FormTransaksi />
            </Navbar>
          }
        />
        <Route component={NotFound} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
