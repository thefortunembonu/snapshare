"use client";
import { handleRegister } from "@/redux/features/authActions";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SpinnerButton from "@/components/SpinnerButton";

const Register = () => {
  const [email, setEmail] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");

  const router = useRouter();

  const formdata = {
    email,
    first_name,
    last_name,
    password,
    re_password,
  };

  const dispatch = useAppDispatch();
  const { registered, loading } = useAppSelector((state) => state.auth);

  const register = async () => {
    try {
      await dispatch(handleRegister(formdata));
    } catch (error) {}
  };

  if (registered) {
    router.push("/login");
  }

  return (
    <div className="pt-20  md:pt-20  pb-80 lg:pb-12 md:h-[1368px] lg:h-full">
      <div className="max-w-[500px] mx-auto ">
        <h1 className="heading my-8">Register</h1>
        <form className="flex flex-col px-8 py-8 bg-gray-50 shadow-md rounded  dark:bg-gray-800 ">
          <div className="flex gap-3 ">
            <div className="w-full">
              <label className=" form-label">First Name</label>
              <input
                type="text"
                name="first_name"
                value={first_name}
                required
                className="form-input "
                placeholder="First Name"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={last_name}
                required
                className="form-input"
                placeholder="Last Name"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>
          <div className=" ">
            <label className=" form-label">E-mail Address</label>
            <input
              type="email"
              name="email"
              value={email}
              required
              className="form-input"
              placeholder="E-mail Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label"> Password</label>
            <input
              type="password"
              name="password"
              value={password}
              required
              className="form-input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label"> Password</label>
            <input
              type="password"
              name="re_password"
              value={re_password}
              required
              className="form-input"
              placeholder="Confirm Password"
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
          <SpinnerButton onClick={register} loading={loading}>
            Register
          </SpinnerButton>
        </form>
      </div>
    </div>
  );
};

export default Register;
