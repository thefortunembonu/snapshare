import Image from "next/image";
import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineCollections } from "react-icons/md";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { GrIntegration } from "react-icons/gr";
import { IoMdDownload } from "react-icons/io";

const Features = () => {
  return (
    <div className="  py-4 md:py-12 md:px-12 px-6">
      <div className="my-4 md:my-8">
        <h1 className="heading">Features You&apos;ll Love</h1>
      </div>
      <span className="flex justify-center gap-8 ">
        <div className=" my-4 max-h-72 md:max-h-96 md:grid md:grid-cols-2 md:grid-rows-2 ">
          <Image
            src={"/images/sample9.jpg"}
            alt={"_image"}
            width={500}
            height={200}
            priority={true}
            className="object-cover  dark:border-white/20 border-white border-2 rounded-s-lg md:h-full md:w-full md:border-none"
          />

          <Image
            src={"/images/sample5.jpg"}
            alt={"_image"}
            width={500}
            height={200}
            priority={true}
            className="object-cover  dark:border-white/20 border-white border-2 rounded-tr-lg md:border-none"
          />
          <Image
            src={"/images/sample10.jpg"}
            alt={"_image"}
            width={500}
            height={200}
            priority={true}
            className="object-cover dark:border-white/20 border-white border-2 md:border-none"
          />
          <Image
            src={"/images/sample4.jpg"}
            alt={"_image"}
            width={500}
            height={200}
            priority={true}
            className="object-cover  dark:border-white/20 border-white border-2 rounded-br-lg md:border-none"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="card">
            <h2 className="subheading">
              <span>
                <IoCloudUploadOutline />
              </span>
              Instant Uploads
            </h2>
            <p className="bodytext">
              Capture a moment and upload it instantly from your phone or
              camera. Organize your photos into albums and collections for easy
              browsing.
            </p>
          </div>
          <div className="card">
            <h2 className="subheading">
              <span>
                <MdOutlineCollections />
              </span>
              Albums and Collections
            </h2>
            <p className="bodytext">
              Organize your photos into albums and collections for easy
              browsing.
            </p>
          </div>

          <div className="card">
            <h2 className="subheading">
              <span>
                <FaRegShareFromSquare />
              </span>
              Interactive Sharing
            </h2>
            <p className="bodytext">
              Comment, like, and share photos to engage with your community.
            </p>
          </div>
          <div className="card">
            <h2 className="subheading">
              <span>
                <GrIntegration />
              </span>
              Seamless Integration
            </h2>
            <p className="bodytext">
              Connect SnapShare with your favorite social media platforms for
              effortless sharing.
            </p>
          </div>
        </div>
      </span>
      <div className="flex my-4 max-h-64 md:hidden ">
        <Image
          src={"/images/sample9.jpg"}
          alt={"_image"}
          width={200}
          height={200}
          priority={true}
          className="object-cover dark:border-white/20 border-white border-2 rounded-s-lg"
        />
        <div className="">
          <Image
            src={"/images/sample5.jpg"}
            alt={"_image"}
            width={200}
            height={200}
            priority={true}
            className="object-cover dark:border-white/20 border-white border-2 rounded-tr-lg"
          />
          <Image
            src={"/images/sample10.jpg"}
            alt={"_image"}
            width={200}
            height={200}
            priority={true}
            className="object-cover dark:border-white/20 border-white border-2"
          />
          <Image
            src={"/images/sample4.jpg"}
            alt={"_image"}
            width={200}
            height={200}
            priority={true}
            className="object-cover dark:border-white/20 border-white border-2 rounded-br-lg"
          />
        </div>
      </div>
      <hr className="mt-4 dark:border-white/20" />
    </div>
  );
};

export default Features;
