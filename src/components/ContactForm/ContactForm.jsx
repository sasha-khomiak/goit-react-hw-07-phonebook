//підключення використання хуків коли не глобальний стейт юзаємо для контрольованих інпутів
import { useState } from 'react';

// бібліотека автогенерування ключа
import { nanoid } from 'nanoid';

// стилізовані компоненти
import { Input, Label, Button, Form, Wrap } from './ContactForm.styled';

// бібліотека Dispatch для відправки екшенів на редʼюс і запису в стейт
// бібліотека useSelector для отримання даних з глобального стейту для верстки
import { useDispatch, useSelector } from 'react-redux';

// седектор вибору контакта
import { selectContacts } from 'redux/selectors';

// функція формування екшена додавання контакту
import { addContact } from 'redux/operations';

// наш функціональний компонент
export default function ContactForm() {
  //dispatch для відправки екшенів на редʼюс в результаті чого записується стейт
  const dispatch = useDispatch();

  // Глобальний стейт наших контактів
  const contacts = useSelector(selectContacts);

  // локальні стейти для контрольованих інпутів у формі
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // контрольовані інпути. реагуємо на івент
  // беремо нейм каррент таргет  і світч-кейс оновлюємо значення стейту
  const handleChangeInput = e => {
    switch (e.currentTarget.name) {
      case 'name':
        setName(e.currentTarget.value);
        break;
      case 'phone':
        setPhone(e.currentTarget.value);
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
      phone,
    };
    if (checkNewNameRepeate(name)) {
      alert(`${name} is already in contacts!`);
    } else {
      dispatch(addContact(newContact));
      setName('');
      setPhone('');
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
          Phone:
          <Input
            type="tel"
            name="phone"
            // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={phone}
            onChange={handleChangeInput}
          />
        </Label>
      </Wrap>
      <Button type="submit">Add contact</Button>
    </Form>
  );
}
