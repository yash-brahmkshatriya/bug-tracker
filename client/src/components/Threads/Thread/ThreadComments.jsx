import { Typography, Paper } from "@material-ui/core";
import React from "react";
import Information from "../../Utils/Information";
import ThreadComment from "./ThreadComment";

function ThreadComments({ comments }) {
  return (
    <>
      {comments.length > 0 ? (
        <>
          {comments.map((comment) => (
            <ThreadComment comment={comment} />
          ))}
        </>
      ) : (
        <Information message="Be the first one to add a comment!😊" />
      )}
    </>
  );
}

export default ThreadComments;
