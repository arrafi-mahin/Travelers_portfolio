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
        <main>
          <Routes>
            {routes}
            {/* <Route path="/" element={<Users />} />
            <Route path="/:userId/places" element={<UserPlaces />} />
            <Route path="/places/new" element={<NewPlace />} />
            <Route path="/places/:placeId" element={<UpdatePlace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Users />} /> */}
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
