// імпортуємо бібліотеку createSlice
import { createSlice } from '@reduxjs/toolkit';

// storage і persistReducer для роботи із роботи з localStorage
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer } from 'redux-persist';

//  створюємо Slice для 'contacts'
// початковий стан
// ред'юсери з двома екшенами додавання і видалення контакту і перезаписом localStorage
// оскільки ми працюємо із persist то він вписує свої дані в локаосторідж і повертає обʼєкт
// тому краще дані зберігати в обʼєкті в параметрі contacts уже зберігати масив
//  відтак в локалсторідж буде обʼєкт - пергий параметр contacts, а другий технічний _persist
// відповідно і до стейту ми звертаємося через точку до патаметра обʼєкту
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
  },
  reducers: {
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

// конфігурація persist, який працює з localstorage
// key - те, як наші дані будуть зберігатися в localstorage =>  persist:contacts
// storage - посилання на наш localstorage
// whitelist - масив перерахованих обʼєктів які тільки і вносимо в localstorage (за замовчанням все вносить)
const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['contacts'],
};
// створюємо персісторний редʼюсер
//  перший параметр - обʼєкт конфігурації
// другий параметр  - наш редєюсер для зберігання в localstorage
// його  і вписуємо в нашому сторі (дя цього його звідси експортуємо )
export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

//  експорти наших екшенів (для підключення в компонентах)
export const { addContact, deleteContact } = contactsSlice.actions;

//селектори
export const getContacts = state => state.contacts;
