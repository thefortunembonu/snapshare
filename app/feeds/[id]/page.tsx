"use client";
import React, { useEffect, useState } from "react";
import { getcookie } from "@/lib/actions";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

function FeedUpdate() {
  const params = useParams();
  const { id } = params;
  const [caption, setCaption] = useState("");
  const [img, setImg] = useState<File | null>(null);
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
  };

  useEffect(() => {
    getData();
  }, []);

  const postData = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("caption", caption);
    if (img) {
      formData.append("img", img);
    }

    try {
      const access = await getcookie("access");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}feeds/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `JWT ${access}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        toast.success("Post Updated!");
      } else {
        console.log(data);
        toast.warning("Something went wrong!");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="py-40">
      <div className=" dark:bg-gray-800  py-6">
        <div className="flex justify-center">
          <form
            className="flex flex-col gap-3 justify-center"
            onSubmit={postData}
          >
            <input
              type="file"
              className="form-input"
              placeholder="Choose Image"
              onChange={(e) => setImg(e.target.files?.[0] || null)}
            />
            <textarea
              className="form-input !h-[200px]"
              placeholder="Enter caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <div className="flex gap-2 ">
              <button
                type="submit"
                onClick={() => {
                  postData;
                  router.push("/feeds");
                }}
                className="btn-primary w-full"
              >
                Update
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
