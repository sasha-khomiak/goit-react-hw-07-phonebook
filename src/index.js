import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

// React.StrictMode - суворий редим написання коду
// Provider - огортаємо весь наш додаток App, щоб мати доступ до store в будь-якому компоненті
// PersistGate - обгортка для того, щоб працювати localstorage. persistor імпортуєтсья зі стору

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
