import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  value: string;
  path?: string;
  badgeCount?: number;
}

interface SidebarProps {
  menuItems: MenuItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNavigate: (path: string) => void;
  sidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  activeTab,
  setActiveTab,
  onNavigate,
  sidebarOpen,
}) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:relative lg:w-64 border-r overflow-y-auto flex flex-col`}
    >
      {/* Main Menu */}
      <nav className="flex flex-col space-y-2 px-3 py-4 flex-grow">
        <div className="px-3">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Main Menu</h2>
        </div>

        {menuItems.map((item) => (
          <Button
            key={item.value}
            variant={activeTab === item.value ? "default" : "ghost"}
            className={`w-full justify-start rounded-lg ${
              activeTab === item.value ? "bg-[#0052CC]" : ""
            }`}
            onClick={() => {
              setActiveTab(item.value);
              if (item.path) onNavigate(item.path);
            }}
          >
            {item.icon}
            {item.label}
            {item.badgeCount !== undefined && (
              <Badge className="ml-auto bg-red-500 text-white">{item.badgeCount}</Badge>
            )}
          </Button>
        ))}
      </nav>

      {/* User Active Status */}
      <div className="border-t p-4">
        <div className="mx-3 mb-6">
          <div className="rounded-lg bg-gradient-to-r from-green-50 to-green-100 p-3 border border-green-200">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">Active Status</p>
                <p className="text-xs text-green-700">You're online and ready for deliveries</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
