"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatDate } from "@/lib/hooks";
import { useAppSelector } from "@/redux/hooks";
import { FaHeart, FaRegComment, FaRegHeart, FaTrash } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

function CommentCard({
  id,
  profileImg,
  caption,
  profileName,
  date_created,
  num_of_like,
}: any) {
  const [like, setLike] = useState(false);
  const time = formatDate(date_created);
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="border-t-[0.5px] pt-2 mb-2 border-gray-700">
      <div className=" flex items-center gap-2">
        <Image
          src={profileImg ? profileImg : "/images/defaultprofileimage.jpg"}
          alt={"profile-image"}
          width={100}
          height={100}
          className="w-4 h-4 object-cover rounded-full"
        />
        <div className="flex gap-3  items-center">
          <h2 className="font-semibold text-xs text-gray-600 dark:text-gray-300">
            {profileName}
          </h2>
          <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
          <h2 className="text-xs font-normal dark:text-gray-400">{time}</h2>
        </div>
      </div>

      <div className=" px-6">
        <div>
          <p className="text-left text-xs py-2 dark:text-gray-300">{caption}</p>
        </div>
      </div>
      <div className="flex w-full text-sm justify-start gap-12 md:justify-start md:gap-24 px-6 pb-2 dark:text-gray-400">
        <button className="flex items-center gap-2 ">
          {like ? (
            <FaHeart
              className="text-red-600"
              // onClick={toggleRemoveReaction}
            />
          ) : (
            <FaRegHeart
            // onClick={toggleAddReaction}
            />
          )}
          <span className="text-[1rem]">
            {num_of_like > 0 ? num_of_like : null}
          </span>
        </button>
        <FaEdit />
        <FaTrash />
        <IoShareSocialOutline />
      </div>
    </div>
  );
}

export default CommentCard;
