import React from "react";
import { useSelector, useDispatch } from "react-redux";
import authSelectors from "../../redux/Auth/auth-selectors";
import authOperations from "../../redux/Auth/auth-operations";
import s from "./UserMenu.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUserName);

  return (
    <div className={s.container}>
      <span className={s.name}>Welcome, {name}</span>
      <button
        type="button"
        onClick={() => dispatch(authOperations.userLogout())}
      >
        Logout
      </button>
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   name: authSelectors.getUserName(state),
// });

// const mapDispatchToProps = {
//   onLogout: authOperations.userLogout,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
