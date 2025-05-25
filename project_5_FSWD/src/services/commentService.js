import api from './api'

export const commentService = {
  fetchByPost: postId =>
    api.get(`/comments?postId=${postId}`),
  create: (postId, data) =>
    api.post('/comments', { postId, ...data }),
  update: (id, data) =>
    api.put(`/comments/${id}`, data),
  delete: id =>
    api.delete(`/comments/${id}`)
}
