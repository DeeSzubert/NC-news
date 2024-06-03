import { useEffect, useState } from "react";
import { getArticleById } from "../api";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import "../App.css";
import Votes from "./Votes";
import ErrorPage from "./ErrorPage";

const Article = () => {
  const [article, setArticle] = useState({});
  const [votes, setVotes] = useState(0);
  const { article_id } = useParams();
  const [error, setError] = useState("");

  useEffect(() => {
    getArticleById(article_id)
      .then((articleObject) => {
        setArticle(articleObject);
        setVotes(articleObject.votes);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [article_id]);

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <div className="each-article">
      <img src={article.article_img_url} className="article-image" />

      <div>
        <h3>{article.title}</h3>
        <p>{article.body}</p>
        <section className="article-votes-author">
          {" "}
          <div>
            <Votes votes={votes} setVotes={setVotes} />
          </div>
          <p>written by: {article.author}</p>
        </section>
      </div>
      <section>
        <Comments article_id={article_id} />
      </section>
    </div>
  );
};

export default Article;
