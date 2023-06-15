import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://648a22075fa58521cab0e719.mockapi.io';

// 1-1 на звичайному фетчі отримання даних
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/contacts`);
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

axios.defaults.baseURL = 'https://648a22075fa58521cab0e719.mockapi.io';

// 1-2 на  axios отримання даних
// export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
//   const response = await axios.get('/contacts');
//   return response.data;
// });

// 2 на  axios додавання контакту
export const addContact = createAsyncThunk(
  'contacts/addContacts',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', contact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 3 на  axios видалення контакту
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
