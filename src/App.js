import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./Users/Pages/Users";
import NewPlace from "./Places/Pages/NewPlace";
import UserPlaces from "./Places/Pages/UserPlaces";
import MainNavigation from "./Shared/Components/Navigation/MainNavigation";
import UpdatePlace from "./Places/Pages/UpdatePlace";
function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/:userId/places" element={<UserPlaces />} />
          <Route path="/places/new" element={<NewPlace />} />
          <Route path="/places/:placeId" element={<UpdatePlace />} />
          <Route path="*" element={<Users />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
