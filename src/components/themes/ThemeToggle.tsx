import { Sun, Moon } from 'lucide-react'
import { useTheme } from "./ThemeContext"

export function ThemeToggle() {
  const { toggleTheme, isHighContrast } = useTheme()
  
  return (
    <button
      onClick={toggleTheme}
      className={`rounded-full p-2 ${isHighContrast ? 'bg-yellow-300 text-black border-black' : 'bg-white border border-gray-200'}`}
      aria-label={isHighContrast ? "Switch to standard mode" : "Switch to high contrast mode"}
      title={isHighContrast ? "Switch to standard mode" : "Switch to high contrast mode"}
    >
      {isHighContrast ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  )
}