import React, { useState } from "react";
// import PropTypes from "prop-types";
import s from "./ContactForm.module.css";
import Toast from "../Toast/Toast";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import phonebookSelectors from "../../redux/phonebook/contacts-selectors";
import phonebookOperations from "../../redux/phonebook/phonebook-operations";

export default function ContactForm () {
  // static propTypes = {
  //   onAddContact: PropTypes.func.isRequired,
  // };

  // state = {
  //   name: "",
  //   number: "",
  //   haveError: false,
  // };

  const dispatch = useDispatch();
  const contacts = useSelector(phonebookSelectors.getAllContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [haveError, setHaveError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // handleSubmit = (e) => {
  //   e.preventDefault();

  //   const { name, number } = this.state;

  //   if (name === "" || number === "") {
  //     this.showToast("Name or number can't be empty string");

  //     return;
  //   }

  //   if (this.props.contacts.find((item) => item.name === name)) {
  //     this.showToast(`${name} is already in contacts`);
  //     this.setState({ name: "", number: "" });
  //     return;
  //   }

  //   this.props.onAddContact(name, number);

  //   this.setState({ name: "", number: "" });
  // };

  // showToast = (message) => {
  //   this.setState((prev) => ({
  //     haveError: !prev.haveError,
  //     errorMessage: message,
  //   }));
  //   setTimeout(() => {
  //     this.setState((prev) => ({
  //       haveError: !prev.haveError,
  //     }));
  //   }, 1500);
  // };

  
    // const { errorMessage, haveError } = this.state;
  
  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeNumber = (e) => {
    setNumber(e.target.value);
  };

  const showToast = (message) => {
    setHaveError(true);
    setErrorMessage(message);
    setTimeout(() => {
      setHaveError(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || number === "") {
      showToast("Name or number can't be empty string");

      return;
    }

    if (contacts.find((item) => item.name === name)) {
      showToast(`${name} is already in contacts`);
      setName("");
      setNumber("");
      return;
    }

    dispatch(phonebookOperations.addContact(name, number));
    setName("");
    setNumber("");
  };

    return (
      <>
        <CSSTransition
          in={haveError}
          timeout={250}
          classNames="toast"
          unmountOnExit
        >
          <Toast message={errorMessage} />
        </CSSTransition>

        <form onSubmit={handleSubmit} className={s.form}>
          <label className={s.label}>
            Name
            <input
              className={s.input}
              type="text"
              name="name"
              value={name}
              onChange={handleChangeName}
            />
          </label>
          <label className={s.label}>
            Number
            <input
              className={s.input}
              type="text"
              name="number"
              value={number}
              onChange={handleChangeNumber}
            />
          </label>
          <button type="submit" className={s.button}>
            Add contact
          </button>
        </form>
      </>
    );
  }


// const mapStateToProps = (state) => ({
//   contacts: phonebookSelectors.getAllContacts(state),
// });

// const mapDispatchToProps = (dispatch) => ({
//   onAddContact: (name, phone) =>
//     dispatch(phonebookOperations.addContact(name, phone)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
