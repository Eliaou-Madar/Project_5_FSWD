import api from './api'

export const postService = {
  fetchByUser: userId   => api.get(`/posts?userId=${userId}`),
  create:      (userId, data) => api.post('/posts', { userId, ...data }),
  update:      (id, data)     => api.put(`/posts/${id}`, data),
  delete:      id            => api.delete(`/posts/${id}`)
}
