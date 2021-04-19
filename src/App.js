import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Switch } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import authOperations from "./redux/Auth/auth-operations";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loader/Loader";

const HomePage = lazy(() => import("./views/Home-page/HomePage"));
const LoginPage = lazy(() => import("./views/Login-page/LoginPage"));
const Phonebook = lazy(() => import("./views/Phonebook-page/PhonebookPage.js"));
const RegisterPage = lazy(() =>
  import("./views/Register-page/RegisterPage.js")
);

export default function App() {
  const dispatch = useDispatch();

  // componentDidMount() {
  //   this.props.onGetCurrentUser();
  // }

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);
    
  

    return (
      <div>
        <AppBar />
        <Suspense fallback={<Loading />}>
          <Switch>
            <PublicRoute exact path="/" component={HomePage} />
            <PublicRoute
              path="/login"
              restricted
              redirectTo="/phonebook"
              component={LoginPage}
            />
            <PublicRoute
              path="/registration"
              restricted
              redirectTo="/phonebook"
              component={RegisterPage}
            />
            <PrivateRoute
              path="/phonebook"
              redirectTo="/login"
              component={Phonebook}
            />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </div>
    );
  }


// const mapDispatchToProps = {
//   onGetCurrentUser: authOperations.getCurrentUser,
// };

// export default connect(null, mapDispatchToProps)(App);
