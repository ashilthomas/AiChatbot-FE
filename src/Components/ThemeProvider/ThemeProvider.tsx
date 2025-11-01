import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react'

function ThemeProvider() {
      const [darkMode, setDarkMode] = useState(false);

      useEffect(() => {
      if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) 
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
      })

       const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 p-2 rounded-lg bg-[var(--color-light-border)] dark:bg-[var(--color-dark-border)] hover:scale-105 transition-transform"
    >
      {darkMode ? <Moon className="w-5 h-5 text-[var(--color-dark-accent)]" /> : <Sun className="w-5 h-5 text-[var(--color-light-accent)]" />}
    
    </button>
  )
}

export default ThemeProvider