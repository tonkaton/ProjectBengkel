import api from './api';

const proposalService = {
  // 👇 PERBAIKAN: Token langsung jadi parameter kedua/ketiga
  getAll: (token) => 
    api.get('/proposals', token),

  getDetail: (id, token) => 
    api.get(`/proposals/${id}`, token),

  create: (data, token) => 
    api.post('/proposals', data, token),

  accept: (id, token) => 
    api.post(`/proposals/${id}/accept`, {}, token), // Body kosong {}, baru token

  reject: (id, token) => 
    api.post(`/proposals/${id}/reject`, {}, token),
};

export default proposalService;