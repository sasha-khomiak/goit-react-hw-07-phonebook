// стилізовані компоненти
import { Ul, Li, Name, Button } from './ContactList.styled';

// бібліотека Dispatch для відправки екшенів на редʼюс і запису в стейт
// бібліотека useSelector для отримання даних з глобального стейту для верстки
import { useDispatch, useSelector } from 'react-redux';

// функція формування екщена для видалення контакту
// import { deleteContact } from 'redux/contactsSlice';
import { deleteContact } from 'redux/operations';

import { selectContacts, selectIsLoading, selectError } from 'redux/selectors';

// імпорт селектора фільтра
import { selectFilter } from 'redux/selectors';

import { useEffect } from 'react';

import { fetchContacts } from 'redux/operations';

// наш компонент
const ContactList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // отримуємо значення contacts. Реструктуризуємо {}, ьо там міститься обʼєкт зі значенням contacts і якому уже лежить масив
  // отримуємо значення filter
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const filter = useSelector(selectFilter);

  // визначаємо список відфільтрованих контактів (для верстки) в залежності від значення filter
  const filteredContacts = contacts.filter(item =>
    item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase().trim())
  );

  // верстка компонента
  return (
    <>
      {isLoading && <p>Loading tasks...</p>}
      {error && <p>{error}</p>}
      <Ul>
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
    </>
  );
};

export default ContactList;
