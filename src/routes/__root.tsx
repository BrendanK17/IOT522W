import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import Header from '@/components/generic/Header';

export const Route = createRootRoute({
  component: () => {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />

        {/* Main content area */}
        <main className="flex-grow">
          <Outlet />
        </main>

        {/* TanStack Devtools (optional, can be removed if not needed) */}
        <TanStackRouterDevtools />

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center py-4">
          <p>&copy; 2025 Desk Dash. All Rights Reserved.</p>
        </footer>
      </div>
    );
  },
});
