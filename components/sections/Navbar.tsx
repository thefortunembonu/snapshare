"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import ThemeSwitch from "../ThemeSwitch";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useVerify } from "@/lib/hooks";
import { toggleAuthenticatedFalse } from "@/redux/features/authslice";
import { handlecookiedel } from "@/lib/actions";

const MobileDropDown = ({ toggleOpen, open }: any) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(toggleAuthenticatedFalse());
    handlecookiedel();
  };
  return (
    <div className={`mobdropdown ${open ? "block" : "hidden"}`}>
      <div onClick={() => toggleOpen()}>
        <div>
          <Link href={"/"}>
            <button className="mobileNavBtn">Home</button>
          </Link>
          <Link href={"/feeds"}>
            <button className="mobileNavBtn">Feeds</button>
          </Link>
          <ThemeSwitch />
        </div>
      </div>
      <div onClick={() => toggleOpen()}>
        <div>
          {isAuthenticated ? (
            <>
              <button className="mobileNavBtn">Profile</button>
              <button onClick={logout} className="mobileNavBtn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href={"/login"}>
                <button className="mobileNavBtn">Login</button>
              </Link>
              <Link href={"/register"}>
                <button className="mobileNavBtn">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const verify = useVerify();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen((prev) => !prev);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    verify();
  }, []);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed w-full z-10 bg-pink-50 shadow-sm dark:bg-gray-950"
    >
      <MobileDropDown toggleOpen={toggleOpen} open={open} />
      <div className="flex items-center justify-between px-8 py-4">
        <div
          className="flex gap-2 items-center"
          onClick={() => router.push("/")}
        >
          <Image
            src={"/images/SnapShare_Logo.png"}
            height={64}
            width={64}
            alt={"logo_home"}
            className="w-full h-6 sm:h-8 cursor-pointer"
          />
          <span className="gradient-text heading">SnapShare</span>
        </div>
        <div className="flex gap-5 items-center">
          {user ? (
            <div className="flex items-center gap-2">
              <Image
                src={user.img ? user.img : "/images/defaultprofileimage.jpg"}
                alt={"profile-image"}
                width={100}
                height={100}
                className="object-cover w-6 h-6 sm:w-8 sm:h-8 rounded-full"
              />

              <span className="!text-xs bodytext hidden sm:block">
                {" "}
                {user.first_name + " " + user.last_name}
              </span>
            </div>
          ) : null}

          <div
            onClick={toggleOpen}
            className="text-4xl dark:text-white/40 cursor-pointer hover:scale-105"
          >
            {open ? <IoClose /> : <FaBars />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
