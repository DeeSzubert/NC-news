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

export { getArticles };
