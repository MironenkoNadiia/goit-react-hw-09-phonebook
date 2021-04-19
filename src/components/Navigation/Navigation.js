import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import authSelectors from "../../redux/Auth/auth-selectors";
import s from "./Navigation.module.css";

export const Navigation = ({ isLogedIn }) => {
  return (
    <nav>
      <NavLink exact to="/" className={s.link} activeClassName={s.activeLink}>
        Home
      </NavLink>
      {isLogedIn && (
        <NavLink
          exact
          to="/phonebook"
          className={s.link}
          activeClassName={s.activeLink}
        >
          Phonebook
        </NavLink>
      )}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isLogedIn: authSelectors.getIsLogedIn(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
