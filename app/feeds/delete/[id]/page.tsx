"use client";
import React, { useEffect, useState } from "react";
import { getcookie } from "@/lib/actions";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useVerify } from "@/lib/hooks";
import Image from "next/image";

function FeedUpdate() {
  const params = useParams();
  const verify = useVerify();
  const { id } = params;
  const [caption, setCaption] = useState("");
  const [img, setImg] = useState<string>("");
  const router = useRouter();

  const getData = async () => {
    const access = await getcookie("access");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}feeds/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${access}`,
        },
      }
    );
    const data = await response.json();
    setCaption(data.caption);
    setImg(data.img);
  };

  useEffect(() => {
    getData();
    verify();
  }, []);

  const deleteFeed = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const access = await getcookie("access");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}feeds/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `JWT ${access}`,
          },
        }
      );
      if (response.status === 204) {
        toast.success("Post Deleted!");
      } else if (response.status === 403) {
        toast.error("You are not authorized to delete this post!");
      } else {
        toast.warning("Something went wrong!");
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="py-40">
      <div className=" dark:bg-gray-800 py-6">
        <div className="flex justify-center">
          <form
            className="flex flex-col gap-3 px-6 justify-center"
            onSubmit={deleteFeed}
          >
            <div>
              <h1 className="font-bold dark:text-white">
                Are you sure you want to delete this feed?
              </h1>
            </div>
            <div className="bg-gray-700 rounded-lg py-2 overflow-hidden flex flex-col  items-center justify-center gap-4">
              <div className="dark:text-white text-xs">
                {caption.slice(0, 100)}
              </div>
              <Image
                className="object-cover h-36 rounded-md"
                src={img ? img : "/images/defaultprofileimage.jpg"}
                alt="Image"
                width={200}
                height={200}
              />
            </div>

            <div className="flex gap-2 ">
              <button
                type="submit"
                onClick={() => {
                  deleteFeed;
                  router.push("/feeds");
                }}
                className="btn-primary w-full"
              >
                Delete
              </button>
              <button
                type="submit"
                onClick={() => router.back()}
                className="btn-secondary w-full"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FeedUpdate;
