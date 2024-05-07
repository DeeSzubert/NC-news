import { useEffect, useState } from "react";
import { getCommentByArticleById } from "../api";
import "../App.css";

const Comments = ({ article_id }) => {
  const [commentsList, setCommentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCommentByArticleById(article_id).then((comments) => {
      if (!comments) {
        setIsLoading(true);
      } else {
        console.log(comments);
        setCommentsList(comments);
        setIsLoading(false);
      }
    });
  }, [article_id]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="comments-wrapper">
      <h3>comments:</h3>
      {commentsList.map((comment) => {
        return (
          <>
            <div key={comment.comment_id} className="comments-list-wrapper">
              <p>{comment.body}</p>

              <section>
                <p>votes: {comment.votes}</p>
                <p>commented by: {comment.author}</p>
              </section>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Comments;
