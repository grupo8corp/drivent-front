import api from './api';

export async function getHotels(token) {
  const response = await api.get(`/hotels`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
}

export async function getRooms(token, id) {
  const response = await api.get(`/hotels/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
}

export async function getBookings(token) {
  const response = await api.get(`/booking`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
}

export async function postBookings(token, roomId) {
  const response = await api.post(`/booking`, { roomId }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
}

export async function putBookings(token, id, roomId) {
  const response = await api.put(`/booking/${id}`, { roomId }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
}
