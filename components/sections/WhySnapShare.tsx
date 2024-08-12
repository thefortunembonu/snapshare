import React from "react";
import Image from "next/image";
import { GrGroup } from "react-icons/gr";
import { FaLayerGroup } from "react-icons/fa";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { FaPeopleLine } from "react-icons/fa6";

const WhySnapShare = () => {
  return (
    <div className="py-4 px-6 md:px-12">
      <div className="my-4 md:mb-10">
        <h1 className="heading">Why SnapShare?</h1>
      </div>
      <span className="flex  ">
        <div className="flex flex-wrap gap-2 justify-center  md:justify-start">
          <div className="card">
            <h2 className="subheading">
              <span>
                <FaPeopleLine />
              </span>
              <h2> Easy Sharing</h2>
            </h2>
            <p className="bodytext">
              Share your photos with friends, family, or the entire world in
              just a few clicks.
            </p>
          </div>

          <div className="card">
            <h2 className="subheading">
              <span>
                <FaLayerGroup />
              </span>
              <h2> High-Quality Storage</h2>
            </h2>
            <p className="bodytext">
              Keep your photos safe and secure in high resolution, ensuring
              every detail is preserved.
            </p>
          </div>

          <div className="card">
            <h2 className="subheading">
              {" "}
              <span>
                <RiGitRepositoryPrivateLine />
              </span>
              <h2> Private and Public Galleries</h2>
            </h2>
            <p className="bodytext">
              Choose who can see your photos with customizable privacy settings.
            </p>
          </div>

          <div className="card">
            <h2 className="subheading">
              {" "}
              <span>
                <GrGroup />
              </span>
              <h2> Community</h2>
            </h2>
            <p className="bodytext">
              Connect with like-minded photo enthusiasts, follow your favorite
              photographers, and get inspired by stunning visuals from around
              the globe.
            </p>
          </div>
        </div>
        <div className="my-2">
          <Image
            src={"/images/sample7.jpg"}
            alt={"image"}
            height={200}
            width={500}
            className="object-cover hidden sm:block w-full h-48 rounded-md md:h-full md:min-w-[400px] lg:h-[400px]"
          />
        </div>
      </span>
      <hr className="mt-4 dark:border-white/20" />
    </div>
  );
};

export default WhySnapShare;
