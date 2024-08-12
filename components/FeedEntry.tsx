import { getcookie } from "@/lib/actions";
import React, { useState } from "react";
import { toast } from "sonner";
import SpinnerButton from "./SpinnerButton";
import { useRouter } from "next/navigation";

function FeedEntry({ setOpen }: any) {
  const [caption, setCaption] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postData = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("caption", caption);
    if (img) {
      formData.append("img", img);
    }

    const access = await getcookie("access");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}feeds/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${access}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (response.status === 201) {
      setLoading(false);
      setOpen(false);
      router.push("feeds");
      toast.success("Post shared!");
    } else {
      setLoading(false);
      setOpen(false);
      router.push("feeds");
      toast.warning("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="fixed dark:bg-gray-800 top-36 rounded-lg backdrop-blur-[0.25rem] w-[400px] py-12">
        <div className="flex justify-center">
          <button
            onClick={() => setOpen(false)}
            className="absolute font-bold dark:text-white right-7 top-5"
          >
            X
          </button>
          <form
            className="flex flex-col gap-3 justify-center"
            onSubmit={postData}
          >
            <input
              type="file"
              className="form-input"
              placeholder="Choose Image"
              onChange={(e) => setImg(e.target.files?.[0] || null)}
              required
            />
            <textarea
              className="form-input !h-[200px]"
              placeholder="Enter caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <SpinnerButton loading={loading} onClick={postData}>
              Post
            </SpinnerButton>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FeedEntry;
