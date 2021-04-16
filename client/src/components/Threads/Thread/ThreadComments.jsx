import { Typography, Paper } from '@material-ui/core';
import React from 'react';
import Information from '../../Utils/Information';
import ThreadComment from './ThreadComment';

function ThreadComments({ projectId, threadId, comments }) {
  return (
    <>
      {comments.length > 0 ? (
        <>
          {comments.map((comment) => (
            <ThreadComment
              projectId={projectId}
              threadId={threadId}
              comment={comment}
            />
          ))}
        </>
      ) : (
        <Information message="Be the first one to add a comment!😊" />
      )}
    </>
  );
}

export default ThreadComments;
