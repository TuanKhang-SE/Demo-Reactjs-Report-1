import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// GET all books
export const getBooks = () => {
  return axios.get(API_URL);
};

// GET book by id
export const getBookById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// CREATE book
export const createBook = (data) => {
  return axios.post(API_URL, data);
};

// UPDATE book
export const updateBook = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

// DELETE book
export const deleteBook = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
