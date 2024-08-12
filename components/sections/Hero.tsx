import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="py-4 pt-32 md:pt-40 md:pb-4">
      <div>
        <h1 className="heading md:text-5xl md:px-56 md:my-8 mb-2 ">
          Capture, Share, and Relive Your Moments
        </h1>
      </div>

      <div>
        <p className="bodytext md:px-56 md:mb-4">
          SnapShare is the ultimate photo-sharing platform that brings your
          memories to life. Whether you're a professional photographer or just
          love snapping photos with friends, SnapShare offers a seamless
          experience for everyone.
        </p>
      </div>

      <div className="md:mb-8 mt-4">
        <Link href={"feeds"}>
          <button className="btn-primary">Share a Photo Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
