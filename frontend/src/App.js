import React, { Fragment, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainNavigation from "./Shared/Components/Navigation/MainNavigation";
import { AuthContext } from "./Shared/Context/Auth-context";
import { useAuth } from "./Shared/hooks/auth-hook";
import "./App.css";
import LoadingSpinner from "./Shared/Components/UIElements/LoadingSpinner";

const Users = React.lazy(()=> import("./Users/Pages/Users"))
const UserPlaces = React.lazy(()=> import("./Places/Pages/UserPlaces"))
const NewPlace = React.lazy(()=> import("./Places/Pages/NewPlace"))
const UpdatePlace = React.lazy(()=> import("./Places/Pages/UpdatePlace"))
const Auth = React.lazy(()=> import("./Users/Pages/Auth"))

function App() {
  const { userId, token, login, logout } = useAuth();
  let routes;
  if (token) {
    routes = (
      <Fragment>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />

        <Route path="*" element={<Users />} />
      </Fragment>
    );
  } else {
    routes = (
      <Fragment>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Auth />} />
      </Fragment>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLogin: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main className="main">
          <div className="blur"></div>
        </main>
        <div className="content">
          <Suspense fallback={<div className="center"><LoadingSpinner /></div>}><Routes>{routes}</Routes></Suspense>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
