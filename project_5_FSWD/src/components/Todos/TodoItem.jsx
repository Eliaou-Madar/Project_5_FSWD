import React from 'react';

export default function TodoItem({ todo }) {
  return (
    <li>
      <input type="checkbox" checked={todo.completed} readOnly />
      {todo.title}
    </li>
  );
}
