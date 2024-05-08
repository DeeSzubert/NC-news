import { useEffect, useState } from "react";
import { getArticles, getArticleByTopic } from "../api";
import "../App.css";
import { Link, useParams, useNavigate } from "react-router-dom";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (topic) {
      getArticleByTopic(topic)
        .then((articles) => {
          setArticles(articles);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } else {
      getArticles()
        .then((articles) => {
          setArticles(articles);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [topic]);

  const handleTopicChange = (e) => {
    const selectedTopic = e.target.value;
    navigate(
      selectedTopic ? `/allArticles/topics/${selectedTopic}` : "/allArticles"
    );
  };

  const handleSortChange = (e) => {
    const sortKey = e.target.value;
    setSortBy(sortKey);
    const sortedArticles = [...articles];

    if (sortKey === "byDate") {
      sortedArticles.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (sortKey === "commentCount") {
      sortedArticles.sort((a, b) => b.comment_count - a.comment_count);
    } else if (sortKey === "votes") {
      sortedArticles.sort((a, b) => b.votes - a.votes);
    } else if (sortKey === "ASC") {
      sortedArticles.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortKey === "DESC") {
      sortedArticles.sort((a, b) => b.title.localeCompare(a.title));
    }

    setArticles(sortedArticles);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div>
        <label htmlFor="topics">Choose a topic</label>
        <select
          name="topics"
          id="topics"
          onChange={handleTopicChange}
          value={topic || ""}
        >
          <option value="">All articles</option>
          <option value="coding">coding</option>
          <option value="football">football</option>
          <option value="cooking">cooking</option>
        </select>
      </div>
      <div>
        <label htmlFor="topics">sort articles</label>
        <select
          name="topics"
          id="topics"
          onChange={handleSortChange}
          value={sortBy || ""}
        >
          <option value="">Sort</option>
          <option value="byDate">by date</option>
          <option value="commentCount">by comment count</option>
          <option value="votes">by votes</option>
          <option value="ASC">ascending</option>
          <option value="DESC">descending</option>
        </select>
      </div>
      <div>
        <ul className="list-article-wrapper">
          {articles.map((article) => (
            <li key={article.article_id} className="list-article-container">
              <Link to={`/allArticles/${article.article_id}`}>
                <img
                  className="img-article-list"
                  src={article.article_img_url}
                  alt="Article"
                />
              </Link>
              <div className="article-list-header">
                <h3>{article.title}</h3>
                <p>{article.body}</p>
                <section className="article-list-body">
                  <p>
                    <img
                      className="heart-icon"
                      src="https://i.pngimg.me/thumb/f/720/m2i8H7d3Z5b1b1b1.jpg"
                      alt="Heart icon"
                    />
                    {article.votes}
                  </p>
                  <p>{article.author}</p>
                </section>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AllArticles;
