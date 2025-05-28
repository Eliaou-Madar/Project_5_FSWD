// src/pages/PostsPage.jsx
import './PostsPage.css'
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import { postService } from '../services/postService.js'
import { commentService } from '../services/commentService.js'
import useCache from '../hooks/useCache.js'

export default function PostsPage() {
  const { user } = useContext(AuthContext)
  const cache = useCache()
  const [posts, setPosts] = useState([])
  const [searchId, setSearchId] = useState('')
  const [searchTitle, setSearchTitle] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')
  const [editingPostId, setEditingPostId] = useState(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [editingBody, setEditingBody] = useState('')
  const [selectedPost, setSelectedPost] = useState(null)
  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editingCommentBody, setEditingCommentBody] = useState('')


  // Load & cache posts
  useEffect(() => {
    const key = `posts_${user.id}`
    const cached = cache.get(key)
    if (cached) {
      setPosts(cached)
    } else {
      postService.fetchByUser(user.id).then(data => {
        setPosts(data)
        cache.set(key, data)
      })
    }
  }, [user])
  

  // Filtered list
  const displayed = posts
    .filter(p => (searchId ? p.id.toLowerCase().includes(searchId.toLocaleLowerCase()) : true))
    .filter(p => (searchTitle
      ? p.title.toLowerCase().includes(searchTitle.toLowerCase())
      : true))

  // CRUD Posts
  const handleAddPost = async e => {
    e.preventDefault()
    if (!newTitle.trim() || !newBody.trim()) return
    const created = await postService.create(user.id, { title: newTitle, body: newBody })
    setPosts(prev => [...prev, created])
    setNewTitle(''); setNewBody('')
  }

  const handleDeletePost = async id => {
    await postService.delete(id)
    setPosts(prev => prev.filter(p => p.id !== id))
    if (selectedPost?.id === id) {
      setSelectedPost(null); setShowComments(false)
    }
  }

  const startEditingPost = post => {
    setEditingPostId(post.id)
    setEditingTitle(post.title)
    setEditingBody(post.body)
  }

  const saveEditingPost = async id => {
    const updated = await postService.update(id, { title: editingTitle, body: editingBody })
    setPosts(prev => prev.map(p => p.id === id ? updated : p))
    setEditingPostId(null)
    if (selectedPost?.id === id) setSelectedPost(updated)
  }

  // Select post & load comments
  const handleSelectPost = async post => {
    setSelectedPost(post)
    setShowComments(false)
    const cmts = await commentService.fetchByPost(post.id)
    setComments(cmts)
  }

  // Toggle comments panel
  const toggleComments = () => {
    setShowComments(v => !v)
  }

  // CRUD Comments
  const handleAddComment = async e => {
    e.preventDefault()
    if (!newComment.trim()) return
    const created = await commentService.create(selectedPost.id, {
      name: user.username,
      email: user.email,
      body: newComment
    })
    setComments(prev => [...prev, created])
    setNewComment('')
  }

  const handleDeleteComment = async id => {
    await commentService.delete(id)
    setComments(prev => prev.filter(c => c.id !== id))
  }

  const startEditingComment = comment => {
    setEditingCommentId(comment.id)
    setEditingCommentBody(comment.body)
  }

  const saveEditingComment = async id => {
    const comment = comments.find(c => c.id === id)
    const updated = await commentService.update(id, { ...comment, body: editingCommentBody })
    setComments(prev => prev.map(c => c.id === id ? updated : c))
    setEditingCommentId(null)
  }

  return (
    <section className="posts-page">
      <h2>Mes Posts</h2>

      {/* Add Post */}
      <form onSubmit={handleAddPost} className="post-form">
        <input
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="Titre du post"
        />
        <textarea
          value={newBody}
          onChange={e => setNewBody(e.target.value)}
          placeholder="Contenu du post"
        />
        <button type="submit">Ajouter Post</button>
      </form>

      {/* Search */}
      <div className="posts-search">
        <input
          value={searchId}
          onChange={e => setSearchId(e.target.value)}
          placeholder="Filtrer par ID"
        />
        <input
          value={searchTitle}
          onChange={e => setSearchTitle(e.target.value)}
          placeholder="Filtrer par titre"
        />
      </div>

      {/* List of Posts */}
      <ul className="posts-list">
        {displayed.map(post => (
          <li
            key={post.id}
            className={selectedPost?.id === post.id ? 'selected' : ''}
          >
            <span className="post-id">{post.id}.</span>
            <span className="post-title">{post.title}</span>
            <div className="post-actions">
              <button onClick={() => handleSelectPost(post)}>Sélectionner</button>
              <button onClick={() => startEditingPost(post)}>✏️</button>
              <button onClick={() => handleDeletePost(post.id)}>🗑️</button>
            </div>
            {/* Inline edit */}
            {editingPostId === post.id && (
              <div className="post-edit">
                <input
                  value={editingTitle}
                  onChange={e => setEditingTitle(e.target.value)}
                />
                <textarea
                  value={editingBody}
                  onChange={e => setEditingBody(e.target.value)}
                />
                <button onClick={() => saveEditingPost(post.id)}>💾</button>
                <button onClick={() => setEditingPostId(null)}>✖️</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {displayed.length === 0 && <p>Aucun post trouvé.</p>}

      {/* Selected Post Details */}
      {selectedPost && (
        <div className="post-detail">
          <h3>{selectedPost.title}</h3>
          <p>{selectedPost.body}</p>
          <button onClick={toggleComments}>
            {showComments ? 'Cacher' : 'Afficher'} les commentaires
          </button>

          {showComments && (
            <div className="comments-section">
              {/* Add Comment */}
              <form onSubmit={handleAddComment} className="comment-form">
                <textarea
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="Votre commentaire..."
                />
                <button type="submit">Ajouter Commentaire</button>
              </form>

              {/* List Comments */}
              <ul className="comments-list">
                {comments.map(c => (
                  <li key={c.id}>
                    {editingCommentId === c.id ? (
                      <>
                        <textarea
                          value={editingCommentBody}
                          onChange={e => setEditingCommentBody(e.target.value)}
                        />
                        <button onClick={() => saveEditingComment(c.id)}>💾</button>
                        <button onClick={() => setEditingCommentId(null)}>✖️</button>
                      </>
                    ) : (
                      <>
                        <p className="comment-body">{c.body}</p>
                        <p className="comment-meta">
                          — {c.name} ({c.email})
                        </p>
                        {c.email === user.email && (
                          <div className="comment-actions">
                            <button onClick={() => startEditingComment(c)}>✏️</button>
                            <button onClick={() => handleDeleteComment(c.id)}>🗑️</button>
                          </div>
                        )}
                      </>
                    )}
                  </li>
                ))}
                {comments.length === 0 && <li>Aucun commentaire.</li>}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
)
}
