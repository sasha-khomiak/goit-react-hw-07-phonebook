// піключення бібілоеки конфігурації стора @reduxjs/toolkit
import { configureStore } from '@reduxjs/toolkit';

// підключення логгера (для виводу в консолі попереднього стану стора, екшена, і наступного стану стора)
import logger from 'redux-logger';

// підключення slice для нашого фільтра (а потім и з нього витягаємо редʼюсер коли вказуємо в store)
import { filterSlice } from './filter/filterSlice';

// підключення уже готового редʼюсера контактів прогнаного через persist (для зберігання в localStorage)
import { persistedContactsReducer } from '../redux/contacts/contactsSlice';

// підключення persist для роботи з localstorage для Gate в index.js
import { persistStore } from 'redux-persist';

// підключення екшенів для прибирання помилки redux-persist
import {
  // persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// створення store.
// містить стейт-редюсер contacts (прогнаний через persist) і filter
// middleware - для логгера консолі
export const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
    filter: filterSlice.reducer,
  },
  // // 1 logger + error debugger
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    logger,
  ],
  // // 2 just error debugger
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
  // // 3 just logger
  // middleware: getDefaultMiddleware => [...getDefaultMiddleware(), logger],
});

// експортуємо персістор, а його підключаємо в індекс файлі і огортаємо в компоненті PersistGate
export const persistor = persistStore(store);
