import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

// Import the different headers 
import Header from '@/components/generic/Header'; // The default header 
import FoodPrepHeader from '@/components/generic/FoodPrepHeader'; // For food prep related pages

export const Route = createRootRoute({
  component: () => {
    const location = useLocation(); // Get the current location from react-router

    // Determine if the current path starts with "/food-prep"
    const isFoodPrepPage = location.pathname.startsWith('/food-prep');

    return (
      <div className="min-h-screen flex flex-col">
        {/* Conditionally render header based on the path */}
        {isFoodPrepPage ? <FoodPrepHeader /> : <Header />}  {/* Render FoodPrepHeader for /food-prep routes, otherwise render the default Header */}

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
