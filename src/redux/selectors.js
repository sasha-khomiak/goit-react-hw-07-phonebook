//селектори

export const selectContacts = state => state.contacts.contacts;
export const selectError = state => state.contacts.error;
export const selectIsLoading = state => state.contacts.isLoading;

export const selectFilter = state => state.filter;
