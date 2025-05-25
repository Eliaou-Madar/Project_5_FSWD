// src/pages/TodosPage.jsx
import './TodosPage.css'
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import { todoService } from '../services/todoService.js'
import useCache from '../hooks/useCache.js'
import { getItem, setItem } from '../utils/storage.js'

export default function TodosPage() {
  const { user } = useContext(AuthContext)
  const [todos, setTodos] = useState([])

  // Nouveaux états UI
  const [newTitle, setNewTitle] = useState('')
  const [sortBy, setSortBy] = useState('id')
  const [filterId, setFilterId] = useState('')
  const [filterTitle, setFilterTitle] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [editingTitle, setEditingTitle] = useState('')

  // Charger les todos à l’arrivée
  useEffect(() => {
    todoService.fetchByUser(user.id).then(setTodos)
  }, [user])

  // Gestionnaires CRUD
  const handleAdd = async e => {
    e.preventDefault()
    if (!newTitle.trim()) return
    const created = await todoService.create(user.id, { title: newTitle, completed: false })
    setTodos(prev => [...prev, created])
    setNewTitle('')
  }

  const handleDelete = async id => {
    await todoService.delete(id)
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const handleToggle = async todo => {
    const updated = await todoService.update(todo.id, { ...todo, completed: !todo.completed })
    setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)))
  }

  const startEditing = todo => {
    setEditingId(todo.id)
    setEditingTitle(todo.title)
  }

  const saveEditing = async id => {
    if (!editingTitle.trim()) return
    const updated = await todoService.update(id, {
      ...todos.find(t => t.id === id),
      title: editingTitle
    })
    setTodos(prev => prev.map(t => (t.id === id ? updated : t)))
    setEditingId(null)
    setEditingTitle('')
  }

  // Filtrage & tri
  const displayed = todos
    .filter(t => (filterId ? t.id === parseInt(filterId, 10) : true))
    .filter(t =>
      filterTitle
        ? t.title.toLowerCase().includes(filterTitle.toLowerCase())
        : true
    )
    .filter(t => {
      if (filterStatus === 'all') return true
      if (filterStatus === 'completed') return t.completed
      return !t.completed
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'id':
          return a.id - b.id
        case 'title':
          return a.title.localeCompare(b.title)
        case 'status':
          return a.completed === b.completed ? 0 : a.completed ? 1 : -1
        default:
          return 0
      }
    })

  return (
    <section className="todos-page">
      <h2>Mes Todos</h2>

      <form onSubmit={handleAdd} className="todo-form">
        <input
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="Nouveau todo..."
        />
        <button type="submit">Ajouter</button>
      </form>

      <div className="todos-controls">
        <label>
          Trier par:
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="id">ID</option>
            <option value="title">Titre</option>
            <option value="status">Statut</option>
          </select>
        </label>

        <label>
          Filtrer ID:
          <input
            type="number"
            value={filterId}
            onChange={e => setFilterId(e.target.value)}
          />
        </label>

        <label>
          Filtrer Titre:
          <input
            value={filterTitle}
            onChange={e => setFilterTitle(e.target.value)}
            placeholder="Recherche..."
          />
        </label>

        <label>
          Statut:
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">Tous</option>
            <option value="completed">Terminés</option>
            <option value="pending">En cours</option>
          </select>
        </label>
      </div>

      <ul className="todos-list">
        {displayed.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo)}
            />

            {editingId === todo.id ? (
              <>
                <input
                  value={editingTitle}
                  onChange={e => setEditingTitle(e.target.value)}
                />
                <button onClick={() => saveEditing(todo.id)}>💾</button>
                <button onClick={() => setEditingId(null)}>✖️</button>
              </>
            ) : (
              <>
                <span className="todo-id">{todo.id}</span>
                <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
                  {todo.title}
                </span>
                <div className="todo-actions">
                  <button onClick={() => startEditing(todo)}>✏️</button>
                  <button onClick={() => handleDelete(todo.id)}>🗑️</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {displayed.length === 0 && <p>Aucun todo ne correspond aux critères.</p>}
    </section>
  )
}
