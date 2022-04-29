import React, { useEffect, useState } from "react";
import axios from "../../axios";

type User = {
  id: number;
  name: string;
  citizenshipNumber: string;
  email: string;
};

const Users = () => {
  const [users, setUser] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get("/users/all")
      .then((res) => setUser(res.data.users))
      .catch((error) => console.log({ error }));
  }, []);

  const verifyUser = (id: number | string) => {
    axios
      .post("/users/verify", { userId: id })
      .then((res) => {
        console.log(res);
        removeUserFromList(id);
      })
      .catch((error) => console.log({ error }));
  };

  const deleteUser = (id: number | string) => {
    axios
      .delete(`/users/delete/${id}`)
      .then((res) => {
        console.log(res);
        removeUserFromList(id);
      })
      .catch((error) => console.log({ error }));
  };

  const removeUserFromList = (id: number | string) => {
    const index = users.findIndex((user) => user.id == id);
    const newList = [...users];
    newList.splice(index, 1);
    setUser(newList);
  };

  if (users.length === 0) return <div></div>;

  return (
    <div className="users-wrapper">
      {users.map((user, index) => (
        <div key={index} className="user-wrapper">
          {user.name}

          <div>
            <button
              onClick={() => verifyUser(user.id)}
              className="button-primary"
            >
              verify
            </button>

            <button
              onClick={() => deleteUser(user.id)}
              className="button-black"
            >
              delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
