import { Button } from '@/components/ui/button';
import { useNavigate, Link } from '@tanstack/react-router';
import { AlertCircle } from 'lucide-react';
import { UserMenu } from '@/components/generic/UserMenu';
import logo from '../../assets/logo.png';

// Import your avatar images here
import deliveryStaffIcon from '../../assets/delivery_staff_icon.png';
import foodPrepStaffIcon from '../../assets/foodprep_staff_icon.png';
import customerIcon from '../../assets/avatar_1.png';

import { useAuth } from '@/context/AuthContext';

export default function DashboardHeader({ title }: { title: string }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Explicitly define allowed user roles
  type UserRole = 'delivery-staff' | 'food-prep-staff' | 'customer';

  const roleConfig: Record<UserRole, { dashboardRoute: string; avatarSrc: string; displayName: string; email: string }> = {
    'delivery-staff': {
      dashboardRoute: '/delivery-dashboard',
      avatarSrc: deliveryStaffIcon,
      displayName: 'Delivery Staff',
      email: 'delivery@example.com',
    },
    'food-prep-staff': {
      dashboardRoute: '/food-prep-dashboard',
      avatarSrc: foodPrepStaffIcon,
      displayName: 'Food Prep Staff',
      email: 'foodprep@example.com',
    },
    'customer': {
      dashboardRoute: '/customer/order',
      avatarSrc: customerIcon,
      displayName: 'Customer',
      email: 'customer@example.com',
    },
  };

  if (!user || !(user.role in roleConfig)) return null;

  const { dashboardRoute, avatarSrc, displayName, email } = roleConfig[user.role as UserRole];

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2">
            <h1 className="cursor-pointer" onClick={() => navigate({ to: dashboardRoute })}>
              <img src={logo || '/placeholder.svg'} alt="Logo" className="w-auto h-10" />
            </h1>
          </div>
          <div className="h-8 w-[1px] bg-gray-200 hidden lg:block"></div>
          <h1 className="text-lg font-semibold md:text-xl">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/report-issue" className="flex items-center">
            <Button variant="outline" size="lg" className="rounded-full py-3 px-6 flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-red-500 text-sm font-semibold">Report Issue</span>
            </Button>
          </Link>

          <UserMenu
            role={user.role as UserRole}
            name={displayName}
            email={email}
            avatarSrc={avatarSrc}
          />
        </div>
      </div>
    </header>
  );
}
