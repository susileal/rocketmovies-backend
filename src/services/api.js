import axios from "axios"

// reaproveitar a api com o endereço baseURL
export const api = axios.create({
  baseURL: 'http://localhost:3333'
});