// імпортуємо бібліотеку createSlice
import { createSlice } from '@reduxjs/toolkit';

export const getContactsThunk = () => {
  return async dispatch => {
    try {
      dispatch(contactsSlice.actions.fetching);
      const response = await fetch(
        'https://648a22075fa58521cab0e719.mockapi.io/contacts'
      );
      const data = await response.json();
      console.log('data', data);
      dispatch(contactsSlice.actions.fetchSucsess(data));
    } catch (error) {
      dispatch(contactsSlice.actions.fetchError(error));
    }
  };
};

// початковий стан
const initialState = {
  contacts: [],
  isLoading: false,
  error: '',
};

//  !!!! створюємо Slice для 'contacts'
// ред'юсери з двома екшенами додавання і видалення контакту
// тому краще дані зі сховища !!!! зберігати в обʼєкті в параметрі contacts уже зберігати масив
// відповідно і до стейту ми звертаємося через точку до патаметра обʼєкту
export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    fetching(state) {
      state.isLoading = true;
    },
    fetchSucsess(state, action) {
      state.isLoading = false;
      state.contacts = action.payload;
      state.error = '';
    },
    fetchError(state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },

    addContact(state, action) {
      return { contacts: [...state.contacts, action.payload] };
    },
    deleteContact(state, action) {
      return {
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        ),
      };
    },
  },
});

//  експорти наших екшенів (для підключення в компонентах)
export const { addContact, deleteContact } = contactsSlice.actions;

// //селектори
// export const getContacts = state => state.contacts;
