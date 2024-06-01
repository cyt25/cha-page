"use client";
import { Gradient } from "./Gradient";
import { useEffect, useState } from "react";
import ThemeIcon from "./ThemeIcon";
import Tooltip from "./Tooltip";

const storageKey = "theme-preference";

const getColorPreference = () => {
  return localStorage.getItem(storageKey)
    ? localStorage.getItem(storageKey)
    : "auto";
};

const setPreference = (theme) => {
  localStorage.setItem(storageKey, theme);
};

const getOSTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [osTheme, setOsTheme] = useState("light");
  const [isCharlie, setIsCharlie] = useState(false);
  const [isHoveredButton, setIsHoveredButton] = useState(false);
  const effectiveTheme = theme === "auto" ? osTheme : theme;
  const canvasClasses = `transition-all ease-in-out duration-1000 ${
    effectiveTheme === "light"
      ? "contrast-125"
      : "hue-rotate-30 brightness-50 contrast-200"
  }`;

  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, []);

  useEffect(() => {
    setTheme(getColorPreference());
    setOsTheme(getOSTheme());
  }, []);

  useEffect(() => {
    setPreference(theme);
  }, [theme]);

  const toggleTheme = () => {
    // auto -> dark -> light -> auto
    setTheme((prevTheme) => {
      switch (prevTheme) {
        case "auto":
          return "dark";
        case "light":
          return "auto";
        case "dark":
          return "light";
        default:
          return "auto";
      }
    });
  };

  const handleCharlie = () => {
    setIsCharlie((prevIsCharlie) => {
      return !prevIsCharlie;
    });
  };

  return (
    <main className="flex h-screen flex-row items-center relative">
      <canvas
        id="gradient-canvas"
        className={canvasClasses}
        data-transition-in
      />
      {/* Tailwind breakpoints: take effect at the specified breakpoint and above */}
      <button
        className="absolute top-6 right-6 sm:top-24 sm:right-24"
        onClick={toggleTheme}
        onMouseEnter={() => setIsHoveredButton(true)}
        onMouseLeave={() => setIsHoveredButton(false)}
      >
        {/* <button className="absolute top-24 right-24" onClick={toggleTheme}> */}
        <ThemeIcon theme={theme} effectiveTheme={effectiveTheme} />
      </button>

      <Tooltip
        showTooltip={isHoveredButton && theme === "auto"}
        effectiveTheme={effectiveTheme}
      />

      <BigText isLight={effectiveTheme === "light"} isCharlie={isCharlie} />
      <div className="">
        <p
          className={`transition-all ease-in-out duration-1000 drop-shadow-xl absolute sm:bottom-24 sm:right-24 bottom-6 right-6 text-xs font-normal ${
            effectiveTheme === "light" ? "text-gray-900" : "text-gray-100"
          }`}
        >
          🛠️ with Next.js + Tailwind
        </p>
        <p
          className={`transition-color ease-in-out duration-1000 drop-shadow-xl absolute bottom-24 left-24 text-xs font-normal ${
            effectiveTheme === "light" ? "text-gray-900" : "text-gray-100"
          } hidden sm:block`}
        >
          {`My friends call me `}
          {
            <span
              className="font-mono line-through hover:no-underline hover:cursor-pointer"
              onClick={handleCharlie}
            >
              Charlie
            </span>
          }
          {`! 🐕`}
        </p>
      </div>
    </main>
  );
}

function BigText({ isLight, isCharlie }) {
  const textColor = isLight ? "text-gray-900" : "text-gray-100";
  // SOMEHOW don't feel like this is how I should be using tailwind classes
  const transitionClasses = "transition-all ease-in-out duration-1000";
  const charlieClasses = `transition-all ease-in-out duration-1000 pl-2 box ${
    isLight ? "text-gray-100" : "text-gray-900"
  }`;
  const charlesClasses = `transition-all ease-in-out duration-1000 pl-2`;
  return (
    <div className="flex flex-col absolute sm:p-24 p-6 w-full items-start justify-between">
      <h2
        className={`text-3xl drop-shadow-xl font-extrabold ${transitionClasses} ${textColor}`}
      >
        Hey there,
      </h2>
      <h1
        className={`flex text-5xl drop-shadow-2xl font-black ${transitionClasses} ${textColor}`}
      >
        {`I'm `}
        <span className={isCharlie ? charlieClasses : charlesClasses}>
          {isCharlie ? "Charlie" : "Charles"}
        </span>
      </h1>
      <h2
        className={`text-lg font-bold pt-2 pb-2 ${transitionClasses} ${
          !isLight ? "text-yellow-400" : "text-white"
        }`}
      >
        ✦✦✦✦✦
      </h2>
      <h2
        className={`text-2xl drop-shadow-xl font-bold ${transitionClasses} ${textColor}`}
      >
        {`I'm a Full Stack Software Engineer, currently at `}
        {
          <a
            href="https://www.biltrewards.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              isLight ? "text-purple-800" : "text-purple-300"
            } text-opacity-70 hover:font-extrabold hover:underline ${transitionClasses} transition-colors`}
          >
            Bilt Rewards
          </a>
        }
        {`.`}
      </h2>

      <h2
        className={`text-2xl drop-shadow-sm font-semibold ${transitionClasses} ${textColor}`}
      >
        {`Check out my resume `}
        {
          <a
            href="/files/charles-tark-resume-2023.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              isLight ? "text-green-600" : "text-green-300"
            } hover:font-extrabold hover:underline ${transitionClasses} transition-colors`}
          >
            here
          </a>
        }
        {`.`}
      </h2>
    </div>
  );
}
