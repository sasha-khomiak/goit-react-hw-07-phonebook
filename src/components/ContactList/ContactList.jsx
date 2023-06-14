// стилізовані компоненти
import { Ul, Li, Name, Button } from './ContactList.styled';

// бібліотека Dispatch для відправки екшенів на редʼюс і запису в стейт
// бібліотека useSelector для отримання даних з глобального стейту для верстки
import { useDispatch, useSelector } from 'react-redux';

// функція формування екщена для видалення контакту
import { deleteContact, getContacts } from 'redux/contacts/contactsSlice';

// імпорт селектора фільтра
import { getFilter } from 'redux/filter/filterSlice';

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

  // верстка компонента
  return (
    <Ul>
      {filteredContacts.map(item => {
        return (
          <Li key={item.id}>
            <Name>{item.name}: </Name> <p>{item.number}</p>
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
