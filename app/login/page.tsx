"use client";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleLogin } from "@/redux/features/authActions";
import SpinnerButton from "@/components/SpinnerButton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Separate loading states
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingFacebook, setIsLoadingFacebook] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/feeds");
    }
  }, [isAuthenticated, router]);

  const login = async () => {
    setIsLoadingLogin(true); // Set loading state for login button
    try {
      await dispatch(handleLogin({ email, password }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingLogin(false); // Reset loading state
    }
  };

  const loginWithFacebook = () => {
    try {
      setTimeout(() => {
        toast.warning("Failed to sign in with Facebook!");
        setIsLoadingFacebook(false);
      }, 2000); // Replace with actual Facebook login action
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithGoogle = () => {
    try {
      setTimeout(() => {
        toast.warning("Failed to sign in with Google!");
        setIsLoadingGoogle(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-24 pb-80 lg:pb-12 md:h-[1368px] lg:h-full">
      <div className="max-w-[500px] mx-auto">
        <h1 className="heading py-8">Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex flex-col px-8 py-8 bg-gray-50 shadow-md rounded dark:bg-gray-800"
        >
          <div>
            <label className="form-label">E-mail Address</label>
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
            <label className="form-label">Password</label>
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

          <SpinnerButton onClick={login} loading={isLoadingLogin}>
            Login
          </SpinnerButton>

          <SpinnerButton
            onClick={() => {
              setIsLoadingFacebook(true);
              loginWithFacebook();
            }}
            loading={isLoadingFacebook}
          >
            Login with Facebook
          </SpinnerButton>

          <SpinnerButton
            onClick={() => {
              setIsLoadingGoogle(true);
              loginWithGoogle();
            }}
            loading={isLoadingGoogle}
          >
            Login with Google
          </SpinnerButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
