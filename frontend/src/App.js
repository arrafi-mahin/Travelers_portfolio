import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./Users/Pages/Users";
import NewPlace from "./Places/Pages/NewPlace";
import UserPlaces from "./Places/Pages/UserPlaces";
import MainNavigation from "./Shared/Components/Navigation/MainNavigation";
import UpdatePlace from "./Places/Pages/UpdatePlace";
import Auth from "./Users/Pages/Auth";
import { AuthContext } from "./Shared/Context/Auth-context";
import { useAuth } from "./Shared/hooks/auth-hook";
import "./App.css";
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
          <Routes>{routes}</Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
