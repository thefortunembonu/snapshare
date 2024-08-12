import React from "react";

const Footer = () => {
  return (
    <div className="md:py-12">
      <hr className="mt-4 dark:border-white/20" />
      <div className="flex justify-center space-x-20 py-4 font-medium text-left dark:text-gray-500   text-gray-900/60 cursor-pointer ">
        <div className=" ">
          <h3 className="footerText">Facebook</h3>
          <h3 className="footerText">Instagram</h3>
          <h3 className="footerText">TikTok</h3>
          <h3 className="footerText">Dribbble</h3>
          <h3 className="footerText">Pinterest</h3>
          <h3 className="footerText">Unsplash</h3>
        </div>

        <div className="">
          <h3 className="footerText">Pricing</h3>
          <h3 className="footerText">Locations</h3>
          <h3 className="footerText">SnapShare API</h3>
          <h3 className="footerText">Forums</h3>
          <h3 className="footerText">Community</h3>
          <h3 className="footerText">Licenses</h3>
        </div>
      </div>
      <hr className="mt-2 dark:border-white/20" />
      <div className="py-6">
        <h1 className="heading">SnapShare</h1>
        <p className="bodytext !font-thin !text-xs">
          &copy; 2024. All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
