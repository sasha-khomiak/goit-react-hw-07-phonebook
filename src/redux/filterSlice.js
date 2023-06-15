// імпортуємо бібліотеку createSlice
import { createSlice } from '@reduxjs/toolkit';

//  створюємо Slice для filter
// початковий стан ''
// ред'юсер з перезаписом фільтра
// стейт в даному випадку не використовується, тому що нам не важдиве попереднє значення ми перезаписуємо повністю
export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    editFilter(state, action) {
      return action.payload;
    },
  },
});

//  експорти наших екшенів для використання в компонентах
export const { editFilter } = filterSlice.actions;
