import axios from "axios"

// reaproveitar a api com o endereço baseURL
export const api = axios.create({
  baseURL: 'https://rocketmovies-api-q68i.onrender.com'
});