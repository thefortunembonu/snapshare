import React from "react";
import Image from "next/image";

const Community = () => {
  return (
    <div className="py-4 md:py-12">
      <div className="mb-2">
        <h1 className="heading">Join the SnapShare Community Today!</h1>
      </div>
      <div className="mb-2">
        <p className="bodytext">
          Don't let your memories fade away. Sign up for SnapShare and start
          sharing your world, one photo at a time.
        </p>
      </div>

      <div className="md:flex md:flex-col md:items-center">
        <h2 className="subheading">Download the SnapShare app now!</h2>

        <div className="flex md:flex md:gap-2">
          <div>
            {" "}
            <Image
              src={"/images/googleplay.png"}
              height={100}
              width={100}
              alt={"googleplay_img"}
              className="object-contain w-48 md:w-full h-12 cursor-pointer hover:scale-105"
            />
          </div>
          <div>
            <Image
              src={"/images/appstore.png"}
              height={100}
              width={100}
              alt={"appstore_img"}
              className="object-contain w-48 md:w-full h-12 cursor-pointer hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
