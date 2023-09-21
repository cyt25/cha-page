"use client";
import { Gradient } from "./Gradient";
import { useEffect, useState } from "react";
import ThemeIcon from "./ThemeIcon";

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
  const [theme, setTheme] = useState("auto");
  const [osTheme, setOsTheme] = useState("light");
  const effectiveTheme = theme === "auto" ? osTheme : theme;

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
          break;
        case "light":
          return "auto";
          break;
        case "dark":
          return "light";
          break;
        default:
          return "auto";
      }
    });
  };

  return (
    <main className="flex h-screen flex-row items-center relative">
      <canvas
        id="gradient-canvas"
        className={effectiveTheme === "light" ? "" : "hue-rotate-30 brightness-50 contrast-200"}
        data-transition-in
      />
      <button className="absolute top-24 right-24" onClick={toggleTheme}>
        <ThemeIcon theme={theme} effectiveTheme={effectiveTheme} />
      </button>
      <BigText isLight={effectiveTheme === "light"} />
    </main>
  );
}

function BigText({ isLight }) {
  const textColor = isLight ? "text-gray-900" : "text-gray-100";
  console.log(isLight);
  return (
    <div className="flex flex-col absolute p-24 w-full items-start justify-between">
      <h2
        className={`text-3xl drop-shadow-xl font-extrabold transition-all ${textColor}`}
      >
        Hey there,
      </h2>
      <h1
        className={`text-5xl drop-shadow-2xl font-black transition-all ${textColor}`}
      >
        I'm Charles
      </h1>
      <h2
        className={`text-lg font-bold transition-all ${
          !isLight ? "text-yellow-400" : "text-white"
        }`}
      >
        ✦✦✦✦✦
      </h2>
      <h2
        className={`text-2xl drop-shadow-xl font-bold transition-all ${textColor}`}
      >
        I'm a Full Stack Software Engineer, previously at Wayfair.
      </h2>
      <h2
        className={`text-2xl drop-shadow-xl font-bold transition-all ${textColor}`}
      >
        I'd love to hear from you!
      </h2>

      <h2
        className={`py-6 text-xl drop-shadow-xl font-semibold transition-all ${textColor}`}
      >
        {`Check out my resume ${(<a href="www.wayfair.com"></a>)}.`}
      </h2>
    </div>
  );
}
