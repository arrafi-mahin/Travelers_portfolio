import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../Components/PlaceList";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
function UserPlaces(props) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState("");
  const userId = useParams().userId;
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL +`/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);
  const placeDeleteHandler = (deletedPlace) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlace)
    );
  };
  return (
    <Fragment>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />
      )}
    </Fragment>
  );
}

export default UserPlaces;
