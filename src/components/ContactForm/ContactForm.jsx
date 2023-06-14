//підключення використання хуків коли не глобальний стейт юзаємо для контрольованих інпутів
import { useState } from 'react';

// бібліотека автогенерування ключа
import { nanoid } from 'nanoid';

// стилізовані компоненти
import { Input, Label, Button, Form, Wrap } from './ContactForm.styled';

// бібліотека Dispatch для відправки екшенів на редʼюс і запису в стейт
// бібліотека useSelector для отримання даних з глобального стейту для верстки
import { useDispatch, useSelector } from 'react-redux';

// екшин додавання контакту підключаєм з глобального redux стейту
import { addContact, getContacts } from 'redux/contacts/contactsSlice';

// функціональний компонент
export default function ContactForm() {
  //dispatch для відправки екшенів на редʼюс в результаті чого записується стейт
  const dispatch = useDispatch();

  // Глобальний стейт наших контактів
  // оскільки там масив з одним із значень contacts, то ми реструктуризуємо {}
  const { contacts } = useSelector(getContacts);

  // локальні стейти для контрольованих інпутів у формі
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // контрольовані інпути. реагуємо на івент
  // беремо нейм каррент таргет  і світч-кейс оновлюємо значення стейту
  const handleChangeInput = e => {
    switch (e.currentTarget.name) {
      case 'name':
        setName(e.currentTarget.value);
        break;
      case 'number':
        setNumber(e.currentTarget.value);
        break;
      default:
        return;
    }
  };

  // при сабміті форми прівент дефолт
  // створюємо обʼєкт контакту із згенерованим унікальним айді
  // робимо перевірку чи унікальне імʼя
  // якшо імʼя не унікальне то виводимо повідомлення
  // якшо імʼя унікальне то викликаємо екшин addContact
  // і передаємо в нього обʼєкт контакту і кидаємр в диспатч
  // (а там уже оновлюється глобальний стетй)
  // скидаємо значення імені і номера
  const onSubmitForm = e => {
    e.preventDefault();
    const newContact = {
      id: nanoid(5),
      name,
      number,
    };
    if (checkNewNameRepeate(name)) {
      alert(`${name} is already in contacts!`);
    } else {
      dispatch(addContact(newContact));
      setName('');
      setNumber('');
    }
  };

  //перевірка чи є контакт з таким іменем з врахуванням різних регістрів
  // повертає true або false
  const checkNewNameRepeate = newName => {
    let arrayOfNamesInLowerCase = contacts.map(item =>
      item.name.toLocaleLowerCase()
    );
    return arrayOfNamesInLowerCase.includes(newName.toLocaleLowerCase());
  };

  // розмітка форми
  return (
    <Form onSubmit={onSubmitForm}>
      <Wrap>
        <Label>
          Name:
          <Input
            type="text"
            name="name"
            // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChangeInput}
          />
        </Label>
        <Label>
          Number:
          <Input
            type="tel"
            name="number"
            // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChangeInput}
          />
        </Label>
      </Wrap>
      <Button type="submit">Add contact</Button>
    </Form>
  );
}
