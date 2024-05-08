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

const postComment = (article_id, body) => {
  const comment = {
    body: body,
    username: "grumpy19",
  };
  if (article_id) {
    return axios
      .post(
        `https://nc-news-project-lymg.onrender.com/articles/${article_id}/comments`,
        comment
      )
      .then(({ data }) => {
        console.log(data.comment);
        return data.comment;
      })
      .catch((error) => {
        return error.message;
      });
  }
};

const deleteCommentByID = (comment_id) => {
  if (comment_id) {
    return axios
      .delete(
        `https://nc-news-project-lymg.onrender.com/comments/${comment_id}`,
        comment_id
      )
      .then((response) => {
        console.log(`Deleted post with ID ${comment_id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

const getArticleByTopic = (topic) => {
  if (topic) {
    return axios
      .get(`https://nc-news-project-lymg.onrender.com/api/articles`, {
        params: { topic },
      })
      .then(({ data }) => data.articles || [])
      .catch((error) => {
        console.error(`Error fetching articles by topic: ${error.message}`);
        return [];
      });
  }
  return Promise.resolve([]);
};

export {
  getArticles,
  getArticleById,
  getCommentByArticleById,
  patchVotesById,
  postComment,
  deleteCommentByID,
  getArticleByTopic,
};
