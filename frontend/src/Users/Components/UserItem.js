import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../Shared/Components/UIElements/Avatar";
import Card from "../../Shared/Components/UIElements/Card";
import "./UserItem.css";
function UserItem(props) {
  return (
    <li className="user-item">
      <Card className="user-card">
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            <Avatar
              image={process.env.REACT_APP_IMAGE_URL +`/${props.image}`}
              alt={props.name}
            />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount <= 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
}

export default UserItem;
