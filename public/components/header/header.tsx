
// 📊 DASHBOARD Header Component
import React, { useEffect, useState } from "react";
const Header: React.FC = () => {
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    const html = document.documentElement;
    html.classList.toggle("dark", theme === "dark");
    html.style.colorScheme = theme;
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");
    const theme = isDark ? "dark" : "light";
    localStorage.setItem("theme", theme);
    html.style.colorScheme = theme;
  };

  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <>
      <header className={`backdrop-blur-md bg-black/40 dark:bg-black/60 fixed top-0 inset-x-0 z-[60] w-full h-20 flex items-center border-b border-white/10 shadow-md transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between w-full">
          <h1 className="text-lg font-semibold text-gray-100">UserFinder</h1>
          <div className="flex items-center gap-4 text-gray-300">
            <button className="hidden md:inline hover:text-white">🔔</button>
            <button className="md:hidden text-xl" onClick={() => setSearchOpen(true)}>🔍</button>
            <button onClick={toggleDarkMode} className="text-gray-200 border border-white/15 rounded-md px-2.5 py-1.5 hover:bg-white/10 transition">🌓</button>
            <img src="/avatar.png" alt="User" className="w-8 h-8 rounded-full border border-white/15" />
          </div>
        </div>
      </header>
      <div className="h-20"></div>
      {searchOpen && (
        <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md" onClick={() => setSearchOpen(false)}>
          <div className="sticky top-0 px-4 pt-6" onClick={(e) => e.stopPropagation()}>
            <div className="max-w-xl mx-auto">
              <input type="text" autoFocus placeholder="Search dashboards..." className="w-full bg-white text-black placeholder:text-gray-500 rounded-lg px-4 py-3 border border-gray-200 focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
