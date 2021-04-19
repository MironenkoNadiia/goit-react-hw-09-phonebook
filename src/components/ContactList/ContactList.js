import React from "react";
import PropTypes from "prop-types";
import s from "./contactList.module.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import phonebookOperations from "../../redux/phonebook/phonebook-operations";
import phonebookSelectors from "../../redux/phonebook/contacts-selectors";

function ContactList({ contacts, onDeleteContact }) {
  return (
    <TransitionGroup component="ul" className={s.list}>
      {contacts.length === 0 ? (
        <CSSTransition
          key={1}
          timeout={700}
          classNames="message-empty"
          unmountOnExit
        >
          <li>Contact list empty for now</li>
        </CSSTransition>
      ) : (
        contacts.map(({ name, number, id }) => {
          return (
            <CSSTransition key={id} appear={true} timeout={250} classNames={s}>
              <li className={s.listItem}>
                <span>
                  {name}: {number}
                </span>
                <button
                  type="button"
                  className={s.button}
                  onClick={() => onDeleteContact(id)}
                >
                  Delete contact
                </button>
              </li>
            </CSSTransition>
          );
        })
      )}
    </TransitionGroup>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.string,
      id: PropTypes.string,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  contacts: phonebookSelectors.getVisibleContacts(state),
});

const mapDispatchToProps = (dispatch) => ({
  onDeleteContact: (id) => dispatch(phonebookOperations.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
