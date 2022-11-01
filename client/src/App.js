import React from "react";
import Home from "./pages/Home";
import CollectionPage from "./pages/CollectionPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Err from "./pages/err";
import Header from "./components/Header";
import "./index.css";
import ItemPage from "./pages/ItemPage";

const App = () => {
  return (
    <div className="main">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/mycollections" element={<CollectionPage />} />
          <Route exact path="/mycollections/myitems" element={<ItemPage />} />
          <Route exact path="/error" element={<Err />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
