import api from "./api";

const transactionService = {
  getAll: async (token) => {
    return api.get("/transactions", token);
  },

  create: async (data, token) => {
    return api.post("/transactions", data, token);
  },

  updateStatus: async (id, status, token) => {
    return api.put(`/transactions/${id}/status`, { status }, token);
  },

  deleteTransaction: async (id, token) => {
    return api.delete(`/transactions/${id}`, token);
  }
};

export default transactionService;