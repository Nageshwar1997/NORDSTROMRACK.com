import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  const fetchAllUsers = async () => {
    const fetchUsers = await fetch(SummaryApi.allUsers.url, {
      method: SummaryApi.allUsers.method,
      credentials: "include",
    });

    const dataResponse = await fetchUsers.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
      console.log(dataResponse.message);
    }
    console.log("Data Response :", dataResponse);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div>
      <h1 className="text-xl font-bold uppercase text-blue-900">All Users</h1>
      <table className="w-full userTable">
        <thead>
          <tr>
            <th>S.N</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers &&
            allUsers.map((user, index) => (
              <tr key={user?.name + index}>
                <td>{index + 1}</td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>{user?.createdAt}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
