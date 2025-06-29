import { X, Home, TrendingUp, PieChart, BarChart, FileText, Calendar, Bell, ShoppingCart, CreditCard, Car, ShoppingBag, MoreHorizontal, Plane, DollarSign, Building, Car as CarIcon, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

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
    { title: "Crypto", icon: PieChart },
    { title: "Dividends", icon: DollarSign },
    { title: "Provident Funds", icon: DollarSign },
  ],
  reports: [
    { title: "Monthly", icon: FileText },
    { title: "Quarterly", icon: Calendar },
    { title: "Annual", icon: BarChart },
    { title: "Custom", icon: Home },
  ],
  tax: [
    { title: "Income Tax", icon: DollarSign },
    { title: "Capital Gains Tax", icon: BarChart },
    { title: "Crypto Gains Tax", icon: PieChart },
  ],
  expenses: [
    { title: "Food", icon: ShoppingCart },
    { title: "Monthly Subscription", icon: CreditCard },
    { title: "Transport", icon: Car },
    { title: "Shopping", icon: ShoppingBag },
    { title: "Rental", icon: Home },
    { title: "Insurance", icon: DollarSign },
    { title: "Utilities", icon: MoreHorizontal },
    { title: "Other", icon: MoreHorizontal },
  ],
  'credit-card': [
    { title: "Miles", icon: Plane },
    { title: "Cashback", icon: DollarSign },
    { title: "Credit Cards", icon: CreditCard },
  ],
  loan: [
    { title: "Housing", icon: Building },
    { title: "Vehicle", icon: CarIcon },
    { title: "Education", icon: Briefcase },
  ],
  income: [
    { title: "Salary", icon: Briefcase },
    { title: "Rental", icon: Home },
  ],
};

interface SecondarySidebarProps {
  isOpen: boolean;
  activeSection: string;
  setActiveSection: (section: string) => void;
  activeExpenseCategory?: string;
  setActiveExpenseCategory?: (category: string) => void;
}

function renderSidebarItems(items, setActiveExpenseCategory, activeExpenseCategory, level = 0) {
  return items.map((item, index) => {
    const hasSub = item.subcategories && item.subcategories.length > 0;
    return (
      <div key={item.title + index}>
        <button
          className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors text-left ${level > 0 ? 'pl-6' : ''} ${activeExpenseCategory === item.title ? 'bg-blue-100 text-blue-700' : ''}`}
          onClick={setActiveExpenseCategory ? () => setActiveExpenseCategory(item.title) : undefined}
        >
          <item.icon className="w-5 h-5" />
          <span className="font-medium">{item.title}</span>
        </button>
        {hasSub && (
          <div className="ml-2 border-l border-blue-100">
            {renderSidebarItems(item.subcategories, setActiveExpenseCategory, activeExpenseCategory, level + 1)}
          </div>
        )}
      </div>
    );
  });
}

export function SecondarySidebar({ isOpen, activeSection, setActiveSection, activeExpenseCategory, setActiveExpenseCategory }: SecondarySidebarProps) {
  const currentItems = sidebarContent[activeSection as keyof typeof sidebarContent] || [];

  // Subscription state (local only)
  const [subscriptions, setSubscriptions] = useState([
    // Example default
    // { app: "Netflix", fee: 15.99, date: "2023-01-01" },
  ]);
  const [newApp, setNewApp] = useState("");
  const [newFee, setNewFee] = useState("");
  const [newDate, setNewDate] = useState("");

  // Helper for button click
  const handleMonthlySubscriptionClick = () => {
    if (setActiveExpenseCategory) setActiveExpenseCategory("Monthly Subscription");
  };

  // Add new subscription
  const handleAddSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApp || !newFee || !newDate) return;
    setSubscriptions([
      ...subscriptions,
      { app: newApp, fee: parseFloat(newFee), date: newDate },
    ]);
    setNewApp("");
    setNewFee("");
    setNewDate("");
  };

  if (!isOpen) return null;

  if (activeSection === "expenses") {
    return (
      <div className="w-64 bg-white border-r shadow-lg animate-slide-in-right">
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 capitalize">Expenses Menu</h3>
          </div>
        </div>
        <div className="p-2">
          {renderSidebarItems(currentItems, setActiveExpenseCategory, activeExpenseCategory)}
        </div>
      </div>
    );
  }

  // Default menu for other sections
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
            onClick={setActiveExpenseCategory ? () => setActiveExpenseCategory(item.title) : undefined}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
