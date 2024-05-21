import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdCloseCircleOutline } from "react-icons/io";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
    // console.log(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(`${responseData.message} as ${userRole}`);
      onClose();
      callFunc();
    }

    console.log("Updated Response Data :", responseData);
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-blue-200 bg-opacity-55">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm  rounded-md">
        <button
          className="block float-right text-xl hover:text-red-600"
          onClick={onClose}
        >
          <IoMdCloseCircleOutline />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <div className="flex justify-between items-center my-4">
          <p>Role :</p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((role) => (
              <option value={role} key={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <button
          className="w-fit mx-auto block bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
