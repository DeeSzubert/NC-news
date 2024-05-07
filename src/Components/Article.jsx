import { useEffect, useState } from "react";
import { getArticleById } from "../api";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import "../App.css";

const Article = () => {
  const [article, setArticle] = useState({});
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
        <p>{article.votes}</p>
        <p>{article.author}</p>
      </div>
      <section>
        <Comments article_id={article_id} />
      </section>
    </div>
  );
};

export default Article;
