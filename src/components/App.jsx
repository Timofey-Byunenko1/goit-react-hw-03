import "./App.css";
import { useState, useEffect } from "react";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import SearchBox from "./SearchBox/SearchBox";

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const storedContacts = localStorage.getItem("saved-contacts");
    return storedContacts ? JSON.parse(storedContacts) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  useEffect(() => {
    localStorage.setItem("saved-contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleSearchChange = (evt) => {
    setSearchTerm(evt.target.value.trim() || "");
  };
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const handleDelete = (contactToDelete) => {
    setContacts((prev) =>
      prev.filter((contact) => contact !== contactToDelete)
    ); // Видаляємо контакт
  };
  const handleSubmit = (values, actions) => {
    const isCopy = contacts.some(
      (contact) =>
        contact.name.toLowerCase().trim() ===
          values.name.toLowerCase().trim() && contact.phone === values.phone
    );

    if (isCopy) {
      //setErrorMessage("Контакт із таким ім'ям або номером телефону вже існує.");
      actions.setSubmitting(false);
      return;
    }
    setContacts((prev) => [...prev, values]);
    toggleFormVisibility();
    actions.resetForm();
  };
  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <div className="appStyle">
      <h1>Телефонна книга</h1>
      {contacts.length > 1 && (
        <SearchBox
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      )}
      {isFormVisible ? (
        <ContactForm
          handleSubmit={handleSubmit}
          closeForm={toggleFormVisibility}
        />
      ) : (
        <button className="toggleFormBtn" onClick={toggleFormVisibility}>
          Додати контакт
        </button>
      )}
      <ContactList
        contacts={filteredContacts}
        onDelete={handleDelete}
        closeForm={toggleFormVisibility}
      />
    </div>
  );
};

export default App;
