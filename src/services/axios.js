import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000",
});

export const getClients = async () => {
  const response = await API.get("/Clients");

  return response.data;
};

export const createClient = async (newClient) => {
  const response = await API.post("/client", newClient);
  return response.data;
};

export const getOneClient = async (id) => {
  const response = await API.get(`/client/id/${id}`);
  return response.data;
};

export const deleteOneClient = async (id) => {
  const response = await API.delete(`/client/${id}`);
  return response.data;
};

export const updateOneClient = async (id, updatedClient) => {
  const response = await API.put(`/client/${id}`, updatedClient);
  return response.data;
};

export const getAppointments = async () => {
  const response = await API.get("/appointments");
  return response.data;
};

export const createAppointment = async (newAppointment) => {
  const response = await API.post("/appointment", newAppointment);
  return response.data;
};

export const getOneAppointment = async (id) => {
  const response = await API.get(`/appointment/id/${id}`);
  return response.data;
};

export const updateOneAppointment = async (id, updatedAppointment) => {
  const response = await API.put(`/appointment/${id}`, updatedAppointment);
  return response.data;
};

export default API;
