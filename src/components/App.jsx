// імпорт стилізованих компонентів для App (тільки контейнер)
import { Container } from './App.styled';

// імпорт компонентів
import ContactList from './ContactList';
import Filter from './Filter';
import ContactForm from './ContactForm';

// функціональний компонент. головний додаток
export function App() {
  // розмітка
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </Container>
  );
}
