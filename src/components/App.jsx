import Phonebook from './Phonebook/Phonebook';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid/non-secure';
import Main from './Main/Main';
import Contacts from './Phonebook/Contacts/Contacts';

const App = () => {
  const contactsFromLocalStorage = () => {
    const localStorageContacts = window.localStorage.getItem('contacts');
    const parsedContats = JSON.parse(localStorageContacts);

    if (parsedContats) {
      return parsedContats;
    }
    return [];
  };

  const [contacts, setContacts] = useState(contactsFromLocalStorage());
  const [filter, setFilter] = useState('');

  const handleChange = e => {
    setFilter(e.currentTarget.value);
  };

  const formSubmitHandle = data => {
    const id = nanoid();
    if (contacts.filter(contact => contact.name === data.name).length > 0) {
      alert(`${data.name} is already in contacts`);
      return;
    }

    setContacts(prevState => {
      return [...prevState, { name: data.name, number: data.number, id: id }];
    });
  };

  const onClickDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const normolizeFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normolizeFilter)
  );

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Main title="Phonebook">
      <Phonebook onSubmit={formSubmitHandle} />
      {contacts.length > 0 ? (
        <Contacts
          name="Contacts"
          contactsList={visibleContacts}
          onChange={handleChange}
          value={filter}
          onClickDelete={onClickDelete}
        />
      ) : (
        <p>Phonebook empty</p>
      )}
    </Main>
  );
};

// class App extends Component {
//   state = {
//     contacts: [],

//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContats = JSON.parse(contacts);

// if (parsedContats) {
//   this.setState({ contacts: parsedContats });
// }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

// handleChange = e => {
//   const { name, value } = e.currentTarget;
//   this.setState({
//     [name]: value,
//   });
// };

// formSubmitHandle = data => {
//   const id = nanoid();
//   if (
//     this.state.contacts.filter(contact => contact.name === data.name).length >
//     0
//   ) {
//     alert(`${data.name} is already in contacts`);
//     return;
//   }
//   this.setState({
//     contacts: [
//       ...this.state.contacts,
//       {
//         name: data.name,
//         number: data.number,
//         id: id,
//       },
//     ],
//   });
// };

//   onClickDelete = id => {
//     this.setState({
//       contacts: this.state.contacts.filter(contact => contact.id !== id),
//     });
//   };

//   render() {
// const normolizeFilter = this.state.filter.toLowerCase();
// const visibleContacts = this.state.contacts.filter(contact =>
//   contact.name.toLowerCase().includes(normolizeFilter)
// );
// return (
//   <Main title="Phonebook">
//     <Phonebook onSubmit={this.formSubmitHandle} />
//     {this.state.contacts.length > 0 ? (
//       <Contacts
//         name="Contacts"
//         contactsList={visibleContacts}
//         onChange={this.handleChange}
//         value={this.state.filter}
//         onClickDelete={this.onClickDelete}
//       />
//     ) : (
//       <p>Phonebook empty</p>
//     )}
//   </Main>
//     );
//   }
// }

export default App;
