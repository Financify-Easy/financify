import { X, Home, TrendingUp, PieChart, BarChart, FileText, Calendar, Bell, ShoppingCart, CreditCard, Car, ShoppingBag, MoreHorizontal, Plane, DollarSign } from "lucide-react";
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
  ],
  reports: [
    { title: "Monthly", icon: FileText },
    { title: "Quarterly", icon: Calendar },
    { title: "Annual", icon: BarChart },
    { title: "Custom", icon: Home },
  ],
  expenses: [
    { title: "Food", icon: ShoppingCart },
    { title: "Monthly Subscription", icon: CreditCard },
    { title: "Transport", icon: Car },
    { title: "Shopping", icon: ShoppingBag },
    { title: "Other", icon: MoreHorizontal },
  ],
  'credit-card': [
    { title: "Miles", icon: Plane },
    { title: "Cashback", icon: DollarSign },
    { title: "Credit Cards", icon: CreditCard },
  ],
};

interface SecondarySidebarProps {
  isOpen: boolean;
  activeSection: string;
  setActiveSection: (section: string) => void;
  activeExpenseCategory?: string;
  setActiveExpenseCategory?: (category: string) => void;
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

  // Custom Monthly Subscription UI
  if (activeSection === "expenses") {
    // If Monthly Subscription is selected, show the form and list
    if (activeExpenseCategory === "Monthly Subscription") {
      return (
        <div className="w-64 bg-white border-r shadow-lg animate-slide-in-right">
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 capitalize">Monthly Subscription</h3>
            </div>
          </div>
          <div className="p-4">
            <form onSubmit={handleAddSubscription} className="mb-4 space-y-2">
              <input
                className="w-full border rounded px-2 py-1"
                placeholder="App Name"
                value={newApp}
                onChange={e => setNewApp(e.target.value)}
              />
              <input
                className="w-full border rounded px-2 py-1"
                placeholder="Monthly Fee"
                type="number"
                min="0"
                step="0.01"
                value={newFee}
                onChange={e => setNewFee(e.target.value)}
              />
              <input
                className="w-full border rounded px-2 py-1"
                placeholder="Date Subscribed"
                type="date"
                value={newDate}
                onChange={e => setNewDate(e.target.value)}
              />
              <button type="submit" className="w-full bg-blue-600 text-white rounded py-1 mt-2">Add Subscription</button>
            </form>
            <h4 className="font-semibold mb-2">Current Subscriptions</h4>
            <ul className="space-y-2">
              {subscriptions.length === 0 && <li className="text-gray-400">No subscriptions yet.</li>}
              {subscriptions.map((sub, idx) => (
                <li key={idx} className="border rounded p-2 flex flex-col">
                  <span className="font-medium">{sub.app}</span>
                  <span className="text-xs text-gray-500">${sub.fee.toFixed(2)} / month</span>
                  <span className="text-xs text-gray-400">Subscribed: {sub.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    // Otherwise, show the expenses menu
    return (
      <div className="w-64 bg-white border-r shadow-lg animate-slide-in-right">
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 capitalize">Expenses Menu</h3>
          </div>
        </div>
        <div className="p-2">
          {currentItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors text-left"
              onClick={item.title === "Monthly Subscription" && setActiveExpenseCategory ? () => setActiveExpenseCategory("Monthly Subscription") : undefined}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </button>
          ))}
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
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
