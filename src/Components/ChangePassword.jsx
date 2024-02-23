import React, { useState } from "react";
import axiosInstance from "./axios/axios";
import headers from "./headers/headers";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");

  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirm_Password(e.target.value);
  };
  const handleChangePassword = () => {
    axiosInstance
      .post(
        "changePassword",
        { oldPassword, newPassword, confirm_password },
        { headers }
      )
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="text-white container-fluid min-h-screen my-4 ">
      <div className="justify-between items-center flex md:mx-[24px]">
        <span className="nav-title">Change Password</span>
        <div
          to="/dashboard/generate-receipt"
          //   onClick={setShowModal(true)}
          className="flex gap-2 items-center gen-rec-cont"
        >
          <img src="" alt="" />
          <span className="gen-rec">Generate Receipt</span>
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-center mt-4">
        <form
          onSubmit={handleChangePassword}
          className="my-4 flex flex-col gap-3 xsm:w-full md:w-3/5 mt-16 items-center justify-center"
        >
          <div className=" flex-col flex gap-4 items-start w-full">
            <span className="input-name">Old Password</span>
            <input
              type="password"
              className="form-control input-text"
              value={oldPassword}
              onChange={handleOldPassword}
              required
            />
          </div>
          <div className=" flex-col flex gap-4 items-start w-full">
            <span className="input-name">New Password</span>
            <input
              type="password"
              className="form-control input-text"
              value={newPassword}
              onChange={handleNewPassword}
              required
            />
          </div>
          <div className=" flex-col flex gap-4 items-start w-full">
            <span className="input-name">Confirm Password</span>
            <input
              type="password"
              className="form-control input-text"
              value={confirm_password}
              onChange={handleConfirmPassword}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Change
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
