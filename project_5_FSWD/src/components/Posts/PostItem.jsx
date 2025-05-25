import React from 'react';

export default function PostItem({ post, onSelect }) {
  return (
    <li onClick={() => onSelect(post)}>
      {post.title}
    </li>
  );
}
