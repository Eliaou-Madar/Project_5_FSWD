import React from 'react';

export default function CommentItem({ comment }) {
  return (
    <li>
      <p><strong>{comment.name}</strong> ({comment.email})</p>
      <p>{comment.body}</p>
    </li>
  );
}
