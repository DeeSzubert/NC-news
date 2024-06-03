import { useEffect, useState, useContext } from "react";
import {
  getCommentByArticleById,
  postComment,
  deleteCommentByID,
} from "../api";
import "../App.css";
import ErrorPage from "./ErrorPage";
import { Link, useParams } from "react-router-dom";

import { UserContext } from "../contexts/User";

const Comments = () => {
  const [commentsList, setCommentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [isCommentDeleted, setIsCommentDeleted] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [offlineDeletedComments, setOfflineDeletedComments] = useState([]);
  const { article_id } = useParams();

  const [error, setError] = useState("");
  console.log(newComment);

  const {
    users,
    setUsers,
    username,
    setUsername,
    loginStatus,
    setLoginStatus,
  } = useContext(UserContext);

  useEffect(() => {
    if (article_id) {
      getCommentByArticleById(article_id).then((comments) => {
        if (!comments) {
          setIsLoading(true);
        } else {
          setCommentsList(comments);
          setIsLoading(false);
        }
      });
    } else {
      setError("article doesnt exists");
    }
  }, [article_id]);

  if (error) {
    console.log(error);
    return <ErrorPage message={error} />;
  }

  const handleOnChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPosting(true);

    postComment(article_id, newComment, username)
      .then((postedComment) => {
        if (postedComment) {
          setCommentsList((prevComments) => {
            const newCommentsList = [postedComment, ...prevComments];
            return newCommentsList;
          });
          setNewComment("");
          setIsPosting(false);
        }
      })
      .catch((error) => {});
  };

  const handleRemove = (comment_id) => {
    setDeleteError("");
    setIsCommentDeleted(false);
    deleteCommentByID(comment_id)
      .then(() => {
        setCommentsList((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== comment_id)
        );
        setIsCommentDeleted(true);
      })
      .catch((error) => {
        console.error("Failed to delete comment:", error);
        setDeleteError("Something went wrong. Couldn't delete the comment.");
      });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="comments-wrapper">
      <form onSubmit={handleSubmit} className="comments-form-wrapper">
        <label htmlFor="add-comment">Add Comment</label>
        <textarea
          onChange={handleOnChange}
          value={newComment}
          type="text"
          name=""
          placeholder="add your comment"
          rows="4"
          cols="50"
          required
        />

        <button type="submit">send your comment</button>
      </form>
      {!loginStatus ? (
        <p>you need to be {<Link to={"/"}>logged</Link>} in to comment </p>
      ) : (
        ""
      )}
      <p>{isPosting ? `Comment is posting...be patient` : ""}</p>

      <p>{isCommentDeleted ? `Comment Was deleted` : ""}</p>
      <h3>
        {commentsList.length === 0
          ? `no comments have been posted yet. `
          : `comments:`}
      </h3>
      {commentsList.map((comment) => {
        console.log(comment);
        return (
          <div key={comment.comment_id} className="comments-list-wrapper">
            <p>{comment.body}</p>

            <section>
              <p>votes: {comment.votes}</p>
              <p>commented by: {comment.author}</p>
              {comment.author === username ? (
                <button onClick={() => handleRemove(comment.comment_id)}>
                  X delete comment
                </button>
              ) : (
                ""
              )}
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
