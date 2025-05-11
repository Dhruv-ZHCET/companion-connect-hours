
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Companions API
export const getCompanions = async () => {
  try {
    const response = await api.get('/companions');
    return response.data;
  } catch (error) {
    console.error('Error fetching companions:', error);
    throw error;
  }
};

export const getCompanionById = async (id: string) => {
  try {
    const response = await api.get(`/companions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching companion ${id}:`, error);
    throw error;
  }
};

// Users API
export const createUser = async (userData: any) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (id: string, userData: any) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw error;
  }
};

// Bookings API
export const getUserBookings = async (userId: string) => {
  try {
    const response = await api.get(`/bookings/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bookings for user ${userId}:`, error);
    throw error;
  }
};

export const createBooking = async (bookingData: any) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const updateBookingStatus = async (id: string, status: string) => {
  try {
    const response = await api.patch(`/bookings/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating booking status for ${id}:`, error);
    throw error;
  }
};

export default api;
