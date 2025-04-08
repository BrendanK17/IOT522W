import { createContext, useContext, useEffect, useState, ReactNode } from "react"

type ThemeMode = "default" | "high-contrast"

interface ThemeContextType {
  theme: ThemeMode
  toggleTheme: () => void
  isHighContrast: boolean
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "default",
  toggleTheme: () => {},
  isHighContrast: false,
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize theme from localStorage or default to "default"
  const [theme, setTheme] = useState<ThemeMode>("default")
  
  // Load theme preference from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme-mode") as ThemeMode
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute("data-theme", savedTheme)
    }
  }, [])
  
  // Toggle between default and high-contrast themes
  const toggleTheme = () => {
    const newTheme = theme === "default" ? "high-contrast" : "default"
    setTheme(newTheme)
    localStorage.setItem("theme-mode", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isHighContrast: theme === "high-contrast" }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)