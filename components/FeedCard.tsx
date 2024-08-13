"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BsSend, BsThreeDotsVertical } from "react-icons/bs";
import { FaComment, FaEdit, FaRegHeart, FaTrash } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoMdLink } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { useRouter } from "next/navigation";

import { formatDate } from "@/lib/hooks";
import { useAppSelector } from "@/redux/hooks";
import { getcookie } from "@/lib/actions";
import CommentCard from "./CommentCard";
import { toast } from "sonner";

function Menu({ id }: any) {
  const router = useRouter();
  return (
    <div className="menu-dropdown">
      <button
        onClick={() => router.push(`feeds/${id}`)}
        className="menu-btn dark:text-gray-300 border-b-[0.5px] border-gray-700"
      >
        <FaEdit /> Edit
      </button>
      <button
        onClick={() => router.push(`feeds/delete/${id}`)}
        className="text-red-600 menu-btn"
      >
        <FaTrash /> Delete
      </button>
    </div>
  );
}

function CommentBox({ profileImg, feed_id }: any) {
  const [comment, setComment] = useState("");
  const formdata = {
    comment,
    feed_id,
  };

  const postComment = async () => {
    const access = await getcookie("access");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}feeds/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access}`,
        },
        body: JSON.stringify(formdata),
      }
    );

    if (response.status === 201) {
      toast.success("Comment Added!");
    }
  };

  return (
    <div>
      <div className=" flex gap-3 items-center w-full mb-4 ">
        <Image
          src={profileImg ? profileImg : "/images/defaultprofileimage.jpg"}
          alt={"profile-image"}
          width={100}
          height={100}
          priority
          className="object-cover w-8 h-8 rounded-full"
        />

        <input
          type="text"
          className="form-input"
          placeholder="write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <span>
          <button onClick={postComment} className=" btn-primary">
            <BsSend />
          </button>
        </span>
      </div>
    </div>
  );
}

function FeedCard({
  id,
  profileImg,
  caption,
  profileName,
  img,
  date_created,
  num_of_like,
  comments,
}: any) {
  const [open, setOpen] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [like, setLike] = useState(false);
  const [tmpNum_of_like, setTmpNum_of_Like] = useState<number>(0);

  const time = formatDate(date_created);
  const { user } = useAppSelector((state) => state.auth);
  const toggleAddReaction = () => {
    setLike((prev) => !prev);
    setTmpNum_of_Like((num_of_like) => num_of_like + 1);
  };

  const toggleRemoveReaction = () => {
    setLike((prev) => !prev);
    setTmpNum_of_Like((num_of_like) => num_of_like - 1);
  };

  return (
    <div>
      {open ? <Menu id={id} /> : null}
      <div className="flex items-center gap-2 ">
        <Image
          src={profileImg ? profileImg : "/images/defaultprofileimage.jpg"}
          alt={"profile-image"}
          width={100}
          height={100}
          className="w-8 h-8 object-cover rounded-full"
        />
        <div className="flex flex-col items-start">
          <h2 className="font-semibold text-gray-600 dark:text-gray-300">
            {profileName}
          </h2>
          <p className="text-xs font-normal dark:text-gray-400">{time}</p>
        </div>

        <div onClick={() => setOpen((prev) => !prev)} className="px-2 ml-auto ">
          <BsThreeDotsVertical className="dark:text-gray-400" />
        </div>
      </div>

      <div className="py-3 px-2">
        <div>
          <p className="text-left py-2 dark:text-gray-300">{caption}</p>
        </div>

        <Image
          src={img ? img : "/images/defaultprofileimage.jpg"}
          alt={"image"}
          width={1000}
          height={1000}
          className="object-cover w-full sm:object-contain min-h-[300px] sm:min-h-[400px] max-h-[500px] rounded-lg"
        />
      </div>

      <div className="flex w-full text-2xl justify-between md:justify-start md:gap-24 px-2 py-4 dark:text-gray-400">
        <button className="flex items-center gap-2 ">
          {like ? (
            <FaHeart className="text-red-600" onClick={toggleRemoveReaction} />
          ) : (
            <FaRegHeart onClick={toggleAddReaction} />
          )}
          <span className="text-[1rem] text-gray-500">
            {tmpNum_of_like > 0 ? tmpNum_of_like : null}
          </span>
        </button>
        <button className="text-gray-500">
          {comments && comments.length > 0 ? (
            <FaComment onClick={() => setOpenComment((prev) => !prev)} />
          ) : (
            <FaRegComment onClick={() => setOpenComment((prev) => !prev)} />
          )}
        </button>

        <IoMdLink className="text-gray-500" />
        <IoShareSocialOutline className="text-gray-500" />
      </div>
      {comments && comments.length > 0 ? (
        <div className="px-4 max-h-[100px] sm:max-h-[200px] overflow-scroll md:overflow-auto">
          {comments.map((comment: any, index: number) => {
            return (
              <CommentCard
                key={index}
                id={comment.id}
                profileImg={comment.profile_img}
                profileName={comment.username}
                date_created={comment.date_created}
                caption={comment.comment}
              />
            );
          })}
        </div>
      ) : null}
      {openComment ? <CommentBox profileImg={user.img} feed_id={id} /> : null}
      <hr className="my-2 dark:border dark:border-gray-700" />
    </div>
  );
}

export default FeedCard;
