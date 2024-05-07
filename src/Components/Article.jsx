import { useEffect, useState } from "react";
import { getArticleById } from "../api";
import { Link, useParams } from "react-router-dom";
import Comments from "./Comments";
import "../App.css";
import Votes from "./Votes";

const Article = () => {
  const [article, setArticle] = useState({});
  const [votes, setVotes] = useState(0);
  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id).then((articleObject) => {
      setArticle(articleObject);
      setVotes(articleObject.votes);
    });
  }, [article_id]);

  return (
    <div>
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
