import axios from 'axios';

export interface ApiUser {
  id: number;
  name: string;
}

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export async function getUsers() {
  const response = await api.get<ApiUser[]>('/users');
  return response.data;
}
