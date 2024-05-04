import { useEffect, useState } from "react";
import { getArticles } from "../api";
import "../App.css";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles().then((articles) => {
      if (!articles) {
        setIsLoading(true);
      } else {
        console.log(articles);
        setArticles(articles);
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <ul className="list-article-wrapper">
      {articles.map((article) => {
        return (
          <li key={article.article_id} className="list-article-container">
            <img className="img-article-list" src={article.article_img_url} />
            <div className="article-list-header">
              <h3>{article.title}</h3>
              <p>{article.body}</p>
              <section className="article-list-body">
                <p>
                  <img
                    className="heart-icon"
                    src="https://i.pngimg.me/thumb/f/720/m2i8H7d3Z5b1b1b1.jpg"
                  />
                  {article.votes}
                </p>
                <p>{article.author}</p>
              </section>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default AllArticles;
