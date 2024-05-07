import { useParams } from "react-router-dom";
import { getArticleById, patchVotesById } from "../api";
import { useEffect } from "react";
import { useState } from "react";
import "../App.css";

const Vote = ({ votes, setVotes }) => {
  const [buttonDisables, setButtonDisables] = useState(false);
  const { article_id } = useParams();
  useEffect(() => {
    getArticleById(article_id).then((articleObject) => {
      setVotes(articleObject.votes);
    });
  }, [article_id, setVotes]);

  const handleOnClick = () => {
    patchVotesById(article_id, 1).then((data) => {
      if (data) {
        setVotes((prevVotes) => prevVotes + 1);
        setButtonDisables(true);
      }
    });
  };

  return (
    <div className="article-votes">
      <button
        disabled={buttonDisables}
        onClick={handleOnClick}
        className={buttonDisables ? "disabled-button" : ""}
      >
        <img
          className="heart-icon"
          src="https://i.pngimg.me/thumb/f/720/m2i8H7d3Z5b1b1b1.jpg"
        />
      </button>
      {votes}
    </div>
  );
};

export default Vote;
