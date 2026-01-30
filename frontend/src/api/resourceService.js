import { api } from "./api.js";

export const resourceService = {

  // Fetch all resources from the server
  getAll: async () => {
    const res = await api.get("/resources");
    return res.data;
  },

  // Fetch a single resource by ID
  getOne: async (id) => {
    const res = await api.get(`/resources/${id}`);
    return res.data;
  },

  // Create a new resource with provided data
  create: async (data) => {
    const res = await api.post("/resources", data);
    return res.data;
  },

  // Update an existing resource by ID
  update: async (id, data) => {
    const res = await api.patch(`/resources/${id}`, data);
    return res.data;
  },

  // Delete a resource by ID
  delete: async (id) => {
    await api.delete(`/resources/${id}`);
    return { success: true };
  }

};
