// імпортуємо бібліотеку createSlice
import { createSlice } from '@reduxjs/toolkit';

import { fetchContacts, addContact, deleteContact } from './operations';

// початковий стан
const initialState = {
  contacts: [],
  isLoading: false,
  error: null,
};

//  !!!! створюємо Slice для 'contacts'
// ред'юсери з двома екшенами додавання і видалення контакту
// тому краще дані зі сховища !!!! зберігати в обʼєкті в параметрі contacts уже зберігати масив
// відповідно і до стейту ми звертаємося через точку до патаметра обʼєкту
export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.contacts = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchContacts.rejected](state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
    [addContact.pending](state) {
      state.isLoading = true;
    },
    [addContact.fulfilled](state, action) {
      state.contacts.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    [addContact.rejected](state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
    [deleteContact.pending](state) {
      state.isLoading = true;
    },
    [deleteContact.fulfilled](state, action) {
      const index = state.contacts.findIndex(
        contact => contact.id === action.payload.id
      );
      state.contacts.splice(index, 1);
      state.isLoading = false;
      state.error = null;
    },
    [deleteContact.rejected](state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
  },
});
