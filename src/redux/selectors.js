//селектори

export const getContacts = state => state.contacts.contacts;
export const getFilter = state => state.filter;
export const selectError = state => state.contacts.error;
export const selectIsLoading = state => state.contacts.isLoading;
