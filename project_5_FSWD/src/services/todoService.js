import api from './api'

export const todoService = {
  fetchByUser: userId   => api.get(`/todos?userId=${userId}`),
  create:      (userId, data) => api.post('/todos', { userId, ...data }),
  update:      (id, data)     => api.put(`/todos/${id}`, data),
  delete:      id            => api.delete(`/todos/${id}`)
}
