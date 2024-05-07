import { useEffect, useState } from "react";
import { getCommentByArticleById, postComment } from "../api";
import "../App.css";

const Comments = ({ article_id }) => {
  const [commentsList, setCommentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    getCommentByArticleById(article_id).then((comments) => {
      if (!comments) {
        setIsLoading(true);
      } else {
        setCommentsList(comments);
        setIsLoading(false);
      }
    });
  }, [article_id]);

  const handleOnChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPosting(true);
    setisDisabled(true);
    postComment(article_id, newComment)
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

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="comments-wrapper">
      <form onSubmit={handleSubmit}>
        <label htmlFor="add-comment">Add Comment</label>
        <textarea
          onChange={handleOnChange}
          type="text"
          name=""
          id="add-comment"
          placeholder="add your comment"
          rows="4"
          cols="50"
        />

        <button type="submit">send your comment</button>
      </form>
      <p>{isPosting ? `Comment is posting...be patient` : ""}</p>
      <h3>
        {commentsList.length === 0
          ? `no comments have been posted yet. `
          : `comments:`}
      </h3>
      {commentsList.map((comment) => {
        return (
          <div key={comment.comment_id} className="comments-list-wrapper">
            <p>{comment.body}</p>

            <section>
              <p>votes: {comment.votes}</p>
              <p>commented by: {comment.author}</p>
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
