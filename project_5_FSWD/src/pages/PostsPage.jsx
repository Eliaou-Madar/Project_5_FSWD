// src/pages/PostsPage.jsx
import './PostsPage.css'
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import { postService } from '../services/postService.js'
import { commentService } from '../services/commentService.js'
import PostForm from '../components/Posts/PostForm.jsx'
import PostList from '../components/Posts/PostList.jsx'
import CommentForm from '../components/Comments/CommentForm.jsx'
import CommentList from '../components/Comments/CommentList.jsx'

export default function PostsPage() {
  const { user } = useContext(AuthContext)
  //const cache = useCache()
  const [posts, setPosts] = useState([])
  const [searchId, setSearchId] = useState('')
  const [searchTitle, setSearchTitle] = useState('')
  const [editingPostId, setEditingPostId] = useState(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [editingBody, setEditingBody] = useState('')
  const [selectedPost, setSelectedPost] = useState(null)
  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState(false)
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editingCommentBody, setEditingCommentBody] = useState('')

  // Load & cache posts
  useEffect(() => {
    const key = `posts_${user.id}`
    postService.fetchByUser(user.id).then(data => {
      setPosts(data)
    })
  }, [user])

  // Filtered list
  const displayed = posts
    .filter(p => (searchId ? p.id.toLowerCase().includes(searchId.toLowerCase()) : true))
    .filter(p => (searchTitle
      ? p.title.toLowerCase().includes(searchTitle.toLowerCase())
      : true))

  // CRUD Posts
  const handleAddPost = async (postData) => {
    if (!postData.title.trim() || !postData.body.trim()) return
    const created = await postService.create(user.id, postData)
    setPosts(prev => [...prev, created])
    // cache.set(`posts_${user.id}`, [...posts, created])
  }

  const handleDeletePost = async id => {
    await postService.delete(id)
    setPosts(prev => prev.filter(p => p.id !== id))
    if (selectedPost?.id === id) {
      setSelectedPost(null)
      setShowComments(false)
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
    if (selectedPost?.id === post.id) {
      setSelectedPost(null)
      setShowComments(false)
      return
    }
    
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
  const handleAddComment = async (commentData) => {
    if (!commentData.body.trim()) return
    const created = await commentService.create(selectedPost.id, {
      name: commentData.name || user.username,
      email: commentData.email || user.email,
      body: commentData.body
    })
    setComments(prev => [...prev, created])
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
      <h2>My Posts</h2>

      {/* Add Post */}
      <PostForm onAdd={handleAddPost} />

      {/* Search */}
      <div className="posts-search">
        <input
          value={searchId}
          onChange={e => setSearchId(e.target.value)}
          placeholder="Filter by ID"
        />
        <input
          value={searchTitle}
          onChange={e => setSearchTitle(e.target.value)}
          placeholder="Filter by Title"
        />
      </div>

      {/* List of Posts */}
      <div className="posts-list-container">
        <PostList 
          posts={displayed} 
          onSelect={handleSelectPost}
          selectedPost={selectedPost}
          editingPostId={editingPostId}
          editingTitle={editingTitle}
          editingBody={editingBody}
          onStartEditing={startEditingPost}
          onSaveEditing={saveEditingPost}
          onCancelEditing={() => setEditingPostId(null)}
          onDelete={handleDeletePost}
          onEditingTitleChange={setEditingTitle}
          onEditingBodyChange={setEditingBody}
        />
        {displayed.length === 0 && <p>No post found</p>}
      </div>

      {/* Selected Post Details */}
      {selectedPost && (
        <div className="post-detail">
          <h3>{selectedPost.title}</h3>
          <p>{selectedPost.body}</p>
          <button onClick={toggleComments}>
            {showComments ? 'hide' : 'show'} The comments
          </button>

          {showComments && (
            <div className="comments-section">
              {/* Add Comment */}
              <CommentForm 
                onAdd={handleAddComment}
                defaultName={user.username}
                defaultEmail={user.email}
              />

              {/* List Comments */}
              <CommentList 
                comments={comments}
                currentUserEmail={user.email}
                editingCommentId={editingCommentId}
                editingCommentBody={editingCommentBody}
                onStartEditing={startEditingComment}
                onSaveEditing={saveEditingComment}
                onCancelEditing={() => setEditingCommentId(null)}
                onDelete={handleDeleteComment}
                onEditingBodyChange={setEditingCommentBody}
              />
              {comments.length === 0 && <p>No comments.</p>}
            </div>
          )}
        </div>
      )}
    </section>
  )
}