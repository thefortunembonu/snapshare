"use client";
import FeedCard from "@/components/FeedCard";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useVerify } from "@/lib/hooks";
import FeedEntry from "@/components/FeedEntry";
import { getcookie } from "@/lib/actions";

function Feeds() {
  const verify = useVerify();
  const router = useRouter();
  const [open_feed, setOpenFeed] = useState(false);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) router.push("login");

  const [feedData, setfeeddata] = useState([
    {
      id: "",
      username: "",
      img: "",
      profile_img: "",
      num_of_like: "",
      date_created: "",
      caption: "",
      comments: "",
    },
  ]);

  const getFeedData = async () => {
    try {
      const access = await getcookie("access");
      if (access !== null) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}feeds/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `JWT ${access}`,
            },
          }
        );
        const tmpData = await response.json();
        setfeeddata(tmpData);
        console.log(tmpData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    verify();
    getFeedData();
  }, []);

  return (
    <>
      {open_feed ? <FeedEntry setOpen={setOpenFeed} /> : null}

      <div className="pt-24 sm:pt-28 md:px-24 ">
        <div className=" flex gap-3 items-center w-full pb-4 ">
          <Image
            src={user.img ? user.img : "/images/defaultprofileimage.jpg"}
            alt={"profile-image"}
            width={100}
            height={100}
            className="object-cover w-8 h-8 rounded-full"
          />

          <input
            onClick={() => setOpenFeed((prev) => !prev)}
            type="file"
            className="form-input !text-gray-400"
            placeholder="share a photo..."
          />

          <span className="flex gap-2">
            <button
              onClick={() => setOpenFeed((prev) => !prev)}
              className=" btn-primary"
            >
              Post
            </button>
          </span>
        </div>
        <hr className="dark:border dark:border-gray-700" />
        <div className="pt-4">
          {feedData.map((feed, index) => {
            return (
              <div key={index} className="pb-8">
                <FeedCard
                  id={feed.id}
                  profileImg={feed.profile_img}
                  profileName={feed.username}
                  img={feed.img}
                  caption={feed.caption}
                  date_created={feed.date_created}
                  num_of_like={feed.num_of_like}
                  comments={feed.comments}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Feeds;
