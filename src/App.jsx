import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import AllArticles from "./Components/AllArticles";
import Article from "./Components/Article";
import Comments from "./Components/Comments";
import Votes from "./Components/Votes";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />} exact></Route>
      <Route path="/allArticles" element={<AllArticles />}></Route>
      <Route path="/allArticles/topics/:topic" element={<AllArticles />} />
      <Route path="/allArticles/:article_id" element={<Article />}></Route>
      <Route
        path="/allArticles/:article_id/comments"
        element={<Comments />}
      ></Route>
      <Route path="/Votes" element={<Votes />}></Route>
    </Routes>
  );
}

export default App;
