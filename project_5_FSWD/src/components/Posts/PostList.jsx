import React from 'react';
import PostItem from './PostItem';

export default function PostList({ posts, onSelect }) {
  return (
    <ul>
      {posts.map(post => (
        <PostItem key={post.id} post={post} onSelect={onSelect} />
      ))}
    </ul>
  );
}
