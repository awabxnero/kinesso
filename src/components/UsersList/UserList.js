import React, { Fragment } from "react";
import { useEffect } from "react";
import deleteIcon from "../../assets/images/delete-icon.svg";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, fetchUsers } from "../../store/actions";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export default function UserList() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state);
  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const override = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  if (error) {
    alert("An error as occured, Please reload the page");
  }

  return (
    <Fragment>
      {loading ? (
        <ClimbingBoxLoader
          color="#E53170"
          cssOverride={override}
          data-testid="loader"
        />
      ) : (
        <div className="users-list">
          {users?.map((user) => {
            return (
              <div key={user.id} className="user-card" data-testid="user-card">
                <div>
                  <h2 className="user-name">{user.name}</h2>
                  <p>
                    <b>Email:</b> {user.email}
                  </p>
                  <p>
                    <b>Phone:</b> {user.phone}
                  </p>
                </div>
                <img
                  src={deleteIcon}
                  alt="Delete Icon"
                  className="delete-icon"
                  data-testid={`delete-icon-${user.id}`}
                  onClick={() => handleDeleteUser(user.id)}
                />
              </div>
            );
          })}
        </div>
      )}
    </Fragment>
  );
}
