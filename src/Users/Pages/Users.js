import React from "react";
import UsersList from "../Components/UsersList";
const Users = (props) => {
  const USERS = [
    {
      id: "u1",
      name: "Mahin",
      image:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      places: 3,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
