import React from "react";
import { useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import authSelectors  from "../../redux/Auth/auth-selectors";
import s from "./AppBar.module.css";

export default function AppBar() {
  const isLogedIn = useSelector(authSelectors.getIsLogedIn);
  return (
    <header className={s.header}>
      <Navigation />
      {isLogedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
}

// const AppBar = ({ isLogedIn }) => {
//   return (
//     <header className={s.header}>
//       <Navigation />
//       {isLogedIn ? <UserMenu /> : <AuthNav />}
//     </header>
//   );
// };

// const mapStateToProps = (state) => ({
//   isLogedIn: authSelectors.getIsLogedIn(state),
// });

// const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
