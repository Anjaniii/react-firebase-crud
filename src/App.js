import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import View from "./pages/View";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Home/>}exact />
          <Route path="/add" element={<AddEdit/>} exact/>
          <Route path="/update/:id" element={<AddEdit/>} exact />
          <Route path="/view/:id" element={<View/>} exact/>
          <Route path="/search" element={<Search/>} exact/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
