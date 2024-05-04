import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import AllArticles from "./Components/AllArticles";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}></Route>
      <Route path="/allArticles" element={<AllArticles />}></Route>
    </Routes>
  );
}

export default App;
