import api from './api'

export const photoService = {
  fetchByAlbum: (albumId, { page = 1, limit = 20 } = {}) =>
    api.get(`/photos?albumId=${albumId}&_page=${page}&_limit=${limit}`),
  create: (albumId, data) =>
    api.post('/photos', { albumId, ...data }),
  update: (id, data) =>
    api.put(`/photos/${id}`, data),
  delete: id =>
    api.delete(`/photos/${id}`),
   
}
