"use client";

import React, { useEffect, useState } from "react";

type Theme = "light" | "dark";

function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme") as Theme | null;
    if (localTheme) {
      setTheme(localTheme);
      if (localTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      setTheme("dark");
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div>
      <button onClick={toggleTheme} className="mobileNavBtn">
        {theme === "light" ? (
          <div className="">Switch to Dark Mode</div>
        ) : (
          <div>Switch to Light Mode</div>
        )}
      </button>
    </div>
  );
}

export default ThemeSwitch;
