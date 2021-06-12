import http from './http-common';

class songDataService {
  getSong(id) {
    return http.get('/song/' + id);
  }
  
  getSongs() {
    return http.get('/songs');
  }

  createSong(song) {
    return http.post('/createSong', song);
  }


  updateSong(id, type, data) {
    return http.patch(`/song/${id}/update/${type}`, {data: data})
  }

  addSongSection(id, data) {
    return http.patch(`/song/${id}/update/section/add`, {data: data})
  }

  updateSongSection(id, i, type, data) {
    return http.patch(`/song/${id}/update/section/${i}/${type}`, {data: data})
  }


  updateTitle(id, title) {
    return http.patch('/song/' + id + '/updateTitle', {title: title})
  }

  updateMeta(id, meta) {
    return http.patch('/song/' + id + '/updateMeta', {meta: meta})
  }










  getAll() {
    return http.get('/tutorials');
  }

  get(id) {
    return http.get(`/tutorials/${id}`);
  }

  create(data) {
    return http.post('/tutorials', data);
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}


export default new songDataService();