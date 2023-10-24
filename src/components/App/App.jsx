// App.jsx
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleChangeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  handleSubmitContact = ({ name, number }) => {
    const { contacts } = this.state;

    if (
      contacts.some(
        contact => contact.name === name || contact.number === number
      )
    ) {
      alert('This contact already exists!');
      return;
    }

    const newContact = { id: nanoid(), name, number };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmitContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleChangeFilter} />
        {filteredContacts.length > 0 ? (
          <ContactList
            contacts={filteredContacts}
            onDelete={this.deleteContact}
          />
        ) : (
          <p>No contacts yet</p>
        )}
      </div>
    );
  }
}

export default App;
