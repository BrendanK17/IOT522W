import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Main Content Section */}
        <main className="flex-grow px-6 py-12 max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">Welcome to Desk Dash</h2>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Customer Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-center">For Customers</h3>
              <p className="mt-4 text-gray-600 text-center">Browse the menu, place your order, and track its delivery status.</p>
              <div className="mt-6 text-center">
                <Link to="/login">
                  <Button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">Browse Menu</Button>
                </Link>
              </div>
            </div>
  
            {/* Employee Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-center">For Food Prep Staff</h3>
              <p className="mt-4 text-gray-600 text-center">View and prepare orders for customers with ease.</p>
              <div className="mt-6 text-center">
                <Link to="/login">
                  <Button className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700">View Orders</Button>
                </Link>
              </div>
            </div>
  
            {/* Admin Section (if you want to add admin role in the future) */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-center">For Food Delivery Staff</h3>
              <p className="mt-4 text-gray-600 text-center">Deliver orders to customers quickly and efficiently.</p>
              <div className="mt-6 text-center">
              <Link to="/login" className="block mt-4">
                  <Button className="bg-purple-600 text-white py-2 px-6 rounded-md hover:bg-purple-700">Deliver Orders</Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
    }