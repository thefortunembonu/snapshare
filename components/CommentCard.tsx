"use client";
import React, { useState } from "react";
import Image from "next/image";
import { formatDate } from "@/lib/hooks";
import { useAppSelector } from "@/redux/hooks";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { getcookie } from "@/lib/actions";
import { toast } from "sonner";

function DeleteModal({ comment_id, setOpen }: any) {
  const deleteComment = async () => {
    const access = await getcookie("access");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}feeds/comment/${comment_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `JWT ${access}`,
        },
      }
    );

    if (response.status === 204) {
      setOpen(false);
      toast.success("Comment deleted!");
    } else if (response.status === 403) {
      setOpen(false);
      toast.warning("You are not allowed to delete this comment!");
    } else {
      setOpen(false);
      toast.warning("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="absolute z-[999px] bg-gray-800 py-4 px-4  w-[350px] rounded-lg">
        <div>
          <h1 className="font-bold text-gray-300 py-3">
            Are you sure you want to delete this comment?
          </h1>
        </div>
        <div className="flex gap-2 justify-center">
          <button onClick={deleteComment} className="btn-primary">
            {" "}
            Delete
          </button>
          <button onClick={() => setOpen(false)} className="btn-secondary">
            {" "}
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function CommentCard({
  id,
  profileImg,
  caption,
  profileName,
  date_created,
  num_of_like,
}: any) {
  const [open, setOpen] = useState(false);
  const [like, setLike] = useState(false);
  const time = formatDate(date_created);
  const { user } = useAppSelector((state) => state.auth);
  return (
    <>
      {open ? <DeleteModal setOpen={setOpen} comment_id={id} /> : null}
      <div className="border-t-[0.5px] pt-2 mb-2 border-gray-500">
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
            <p className="text-left text-xs py-2 dark:text-gray-300">
              {caption}
            </p>
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
                className="text-gray-500"
                // onClick={toggleAddReaction}
              />
            )}
            <span className="text-[1rem]">
              {num_of_like > 0 ? num_of_like : null}
            </span>
          </button>
          <FaEdit className="text-gray-500" />
          <button onClick={() => setOpen(true)}>
            <FaTrash className="text-gray-500" />
          </button>
          <IoShareSocialOutline className="text-gray-500" />
        </div>
      </div>
    </>
  );
}

export default CommentCard;
