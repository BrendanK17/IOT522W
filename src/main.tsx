import './index.css'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { BasketProvider } from "@/context/BasketContext";
import { AuthProvider } from "@/context/AuthContext";
import { DarkModeProvider } from "@/context/DarkModeContext";

// Import the generated route tree
import { routeTree } from './routeTree.gen.ts'

// Create a new router instance
const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <DarkModeProvider>
        <AuthProvider>
          <BasketProvider>
            <RouterProvider router={router} />
          </BasketProvider>
        </AuthProvider>
      </DarkModeProvider>
    </StrictMode>,
  )
}
