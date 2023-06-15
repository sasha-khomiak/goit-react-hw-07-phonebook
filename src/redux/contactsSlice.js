// імпортуємо бібліотеку createSlice
import { createSlice } from '@reduxjs/toolkit';

// імпортуємо операції роботи з сервером
import { fetchContacts, addContact, deleteContact } from './operations';

// винесені функції повторюваного коду
//  пендінг
const handlePending = state => {
  state.isLoading = true;
};
// помилка
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

// початковий стан стейту
const initialState = {
  contacts: [],
  isLoading: false,
  error: null,
};

// створюємо Slice для 'contacts'
// ред'юсери у форматі extraReducers з трьома станами запиту на кожну операцію
export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    // читання контактів
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled](state, action) {
      state.contacts = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchContacts.rejected]: handleRejected,

    // додавання контакту
    [addContact.pending]: handlePending,
    [addContact.fulfilled](state, action) {
      state.contacts.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    [addContact.rejected]: handleRejected,

    // видалення контакту
    [deleteContact.pending]: handlePending,
    [deleteContact.fulfilled](state, action) {
      const index = state.contacts.findIndex(
        contact => contact.id === action.payload.id
      );
      state.contacts.splice(index, 1);
      state.isLoading = false;
      state.error = null;
    },
    [deleteContact.rejected]: handleRejected,
  },
});
