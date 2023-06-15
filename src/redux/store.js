// піключення бібілоеки конфігурації стора @reduxjs/toolkit
import { configureStore } from '@reduxjs/toolkit';

// підключення логгера (для виводу в консолі попереднього стану стора, екшена, і наступного стану стора)
import logger from 'redux-logger';

// підключення slice для нашого фільтра (а потім и з нього витягаємо редʼюсер коли вказуємо в store)
import { filterSlice } from './filterSlice';

// підключення slice для наших контактів (а потім и з нього витягаємо редʼюсер коли вказуємо в store)
import { contactsSlice } from './contactsSlice';

// створення store.
// містить стейт-редюсер contacts і filter
// middleware - для логгера консолі
export const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
    filter: filterSlice.reducer,
  },
  //  logger
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), logger],
});
