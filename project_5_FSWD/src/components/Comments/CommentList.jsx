import React from 'react';
import CommentItem from './CommentItem';

export default function CommentList({ comments }) {
  return (
    <ul>
      {comments.map(c => (
        <CommentItem key={c.id} comment={c} />
      ))}
    </ul>
  );
}
