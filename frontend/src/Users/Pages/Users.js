import React, { Fragment, useEffect, useState } from "react";
import UsersList from "../Components/UsersList";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../Shared/hooks/http-hook";
const Users = (props) => {
  const [loadedUser, setLoadedUser] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL +"/users/"
        );

        setLoadedUser(responseData.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUser && <UsersList items={loadedUser} />}
    </Fragment>
  );
};

export default Users;
