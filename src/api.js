import axios from "axios";

const getArticles = () => {
  return axios
    .get(`https://nc-news-project-lymg.onrender.com/articles`)
    .then(({ data }) => {
      return data.articles;
    })
    .catch((error) => {
      return error.message;
    });
};

const getArticleById = (article_id) => {
  if (article_id) {
    return axios
      .get(`https://nc-news-project-lymg.onrender.com/articles/${article_id}`)
      .then(({ data }) => {
        return data.article;
      })
      .catch((error) => {
        return error.message;
      });
  }
};

const getCommentByArticleById = (article_id) => {
  if (article_id) {
    return axios
      .get(
        `https://nc-news-project-lymg.onrender.com/articles/${article_id}/comments`
      )
      .then(({ data }) => {
        return data.comments;
      })
      .catch((error) => {
        return error.message;
      });
  }
};

const patchVotesById = (article_id, inc_votes) => {
  console.log(inc_votes);
  if (article_id) {
    return axios
      .patch(
        `https://nc-news-project-lymg.onrender.com/articles/${article_id}`,
        { inc_votes }
      )
      .then(({ data }) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        return error.message;
      });
  }
};

export { getArticles, getArticleById, getCommentByArticleById, patchVotesById };
