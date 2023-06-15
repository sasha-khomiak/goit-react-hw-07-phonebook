// стилізовані компоненти
import { Ul, Li, Name, Button } from './ContactList.styled';

// бібліотека Dispatch для відправки екшенів на редʼюс і запису в стейт
// бібліотека useSelector для отримання даних з глобального стейту для верстки
import { useDispatch, useSelector } from 'react-redux';

// функція формування екщена для видалення контакту
import { deleteContact } from 'redux/contactsSlice';

import { getContacts } from 'redux/selectors';

// імпорт селектора фільтра
import { getFilter } from 'redux/selectors';

import { getContactsThunk } from '../../redux/contactsSlice';

// наш компонент
const ContactList = () => {
  const dispatch = useDispatch();
  // отримуємо значення contacts. Реструктуризуємо {}, ьо там міститься обʼєкт зі значенням contacts і якому уже лежить масив
  // отримуємо значення filter
  const { contacts } = useSelector(getContacts);
  const filter = useSelector(getFilter);

  // визначаємо список відфільтрованих контактів (для верстки) в залежності від значення filter
  const filteredContacts = contacts.filter(item =>
    item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase().trim())
  );

  // async function getfromApi() {
  //   const response = await fetch(
  //     'https://648a22075fa58521cab0e719.mockapi.io/contacts'
  //   );
  //   const data = await response.json();
  //   console.log('data', data);
  // }

  // getfromApi();

  // верстка компонента
  return (
    <Ul>
      <button onClick={() => dispatch(getContactsThunk())}>111</button>
      {filteredContacts.map(item => {
        return (
          <Li key={item.id}>
            <Name>{item.name}: </Name> <p>{item.phone}</p>
            <Button
              type="button"
              onClick={() => dispatch(deleteContact(item.id))}
            >
              Delete
            </Button>
          </Li>
        );
      })}
    </Ul>
  );
};

export default ContactList;
