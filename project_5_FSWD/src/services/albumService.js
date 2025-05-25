import api from './api'

export const albumService = {
  fetchByUser: userId   => api.get(`/albums?userId=${userId}`),
  create:      (userId, data) => api.post('/albums', { userId, ...data }),
  update:      (id, data)     => api.put(`/albums/${id}`, data),
  delete:      id            => api.delete(`/albums/${id}`)
}
