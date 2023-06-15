//селектори в контактах
export const selectContacts = state => state.contacts.contacts;
export const selectError = state => state.contacts.error;
export const selectIsLoading = state => state.contacts.isLoading;

//селектори в фільтрі
export const selectFilter = state => state.filter;

//селектор відфільтрованих контактів
export const selectFilteredContacts = state => {
  // Використовуємо інші селектори контатків фільтру
  const contacts = selectContacts(state);
  const filter = selectFilter(state);
  // Повертаємо відфільтровані контакти
  return contacts.filter(item =>
    item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase().trim())
  );
};
