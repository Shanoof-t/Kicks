import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
function UserProfile() {
  const { userID } = useParams();
  const { users } = useContext(UserContext);
  const user = users.filter((value) => value.id === userID);

  return user.map((value) => (
    <div className="ms-64">
      <div>
        <h1>{`${value.firstName} ${value.lastName}`}</h1>
      </div>
      <div>
        
      </div>
    </div>
  ));
}

export default UserProfile;
