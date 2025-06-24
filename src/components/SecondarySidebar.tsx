
import { X, Home, TrendingUp, PieChart, BarChart, FileText, Calendar, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarContent = {
  dashboard: [
    { title: "Overview", icon: Home },
    { title: "Analytics", icon: BarChart },
    { title: "Performance", icon: TrendingUp },
    { title: "Alerts", icon: Bell },
  ],
  portfolio: [
    { title: "Holdings", icon: PieChart },
    { title: "Allocation", icon: BarChart },
    { title: "Performance", icon: TrendingUp },
    { title: "Rebalancing", icon: Home },
  ],
  investments: [
    { title: "Stocks", icon: TrendingUp },
    { title: "Bonds", icon: BarChart },
    { title: "Mutual Funds", icon: PieChart },
    { title: "ETFs", icon: Home },
  ],
  reports: [
    { title: "Monthly", icon: FileText },
    { title: "Quarterly", icon: Calendar },
    { title: "Annual", icon: BarChart },
    { title: "Custom", icon: Home },
  ],
};

interface SecondarySidebarProps {
  isOpen: boolean;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function SecondarySidebar({ isOpen, activeSection, setActiveSection }: SecondarySidebarProps) {
  const currentItems = sidebarContent[activeSection as keyof typeof sidebarContent] || [];

  if (!isOpen) return null;

  return (
    <div className="w-64 bg-white border-r shadow-lg animate-slide-in-right">
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800 capitalize">{activeSection} Menu</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {}}
            className="hover:bg-gray-200"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-2">
        {currentItems.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors text-left"
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.title}</span>
          </button>
        ))}
      </div>

      <div className="p-4 border-t mt-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg text-white">
          <h4 className="font-semibold mb-1">Premium Features</h4>
          <p className="text-xs text-blue-100 mb-3">Unlock advanced analytics and AI insights</p>
          <Button size="sm" className="bg-white text-blue-600 hover:bg-gray-100">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
}
