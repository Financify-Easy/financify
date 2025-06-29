import { FinancialDashboard } from "@/components/FinancialDashboard";
import { HousingLoan } from "@/components/HousingLoan";
import { VehicleLoan } from "@/components/VehicleLoan";
import { MilesPage } from "@/components/MilesPage";
import { SalaryIncome } from "@/components/SalaryIncome";
import { RentalIncome } from "@/components/RentalIncome";
import { CryptoInvestments } from "@/components/CryptoInvestments";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { ShoppingCart, CreditCard, Film, Music, AppWindow } from "lucide-react";
import { useState } from "react";
import { ExpenseRental } from "@/components/ExpenseRental";
import { ExpenseInsurance } from "@/components/ExpenseInsurance";
import { ExpenseUtilities } from "@/components/ExpenseUtilities";
import { EducationLoan } from "@/components/EducationLoan";
import { CashbackPage } from "@/components/CashbackPage";
import { CreditCardsPage } from "@/components/CreditCardsPage";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ExpenseFood } from "@/components/ExpenseFood";
import { DividendsPage } from "@/components/DividendsPage";
import { ExpenseTransport } from "@/components/ExpenseTransport";
import { ExpenseVehicle } from "@/components/ExpenseVehicle";
import { CpfEpfPage } from "@/components/CpfEpfPage";
import { IncomeTaxPage } from "@/components/IncomeTaxPage";

const ICONS = [
  { name: "App", icon: AppWindow },
  { name: "Shopping", icon: ShoppingCart },
  { name: "Credit Card", icon: CreditCard },
  { name: "Film", icon: Film },
  { name: "Music", icon: Music },
];

export default function Subscriptions({
  activeSection,
  activeExpenseCategory,
  subscriptions,
  setSubscriptions,
  open,
  setOpen,
}: {
  activeSection: string;
  activeExpenseCategory: string;
  subscriptions: { app: string; fee: number; date: string; icon: string; billing: string }[];
  setSubscriptions: (subs: { app: string; fee: number; date: string; icon: string; billing: string }[]) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [selectedIcon, setSelectedIcon] = useState("App");
  const [billing, setBilling] = useState("monthly");

  if (activeSection === "expenses" && activeExpenseCategory === "Monthly Subscription") {
    // Calculate total spend
    const totalSpend = subscriptions.reduce((sum, sub) => sum + Number(sub.fee), 0);
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <AppWindow className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Monthly Subscriptions</h1>
            <p className="text-gray-600">Manage your recurring app and service subscriptions</p>
          </div>
        </div>
        {/* Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle>Total Monthly Spend</CardTitle>
            <CardDescription>All active subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">${totalSpend.toFixed(2)}</div>
          </CardContent>
        </Card>
        {/* Add Subscription Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Add Subscription</CardTitle>
            <CardDescription>Enter your app subscription details below.</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={e => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const app = (form.elements.namedItem('app') as HTMLInputElement).value;
                const fee = (form.elements.namedItem('fee') as HTMLInputElement).value;
                const date = (form.elements.namedItem('date') as HTMLInputElement).value;
                if (!app || !fee || !date) return;
                setSubscriptions([
                  ...subscriptions,
                  {
                    app,
                    fee: parseFloat(fee),
                    date,
                    icon: selectedIcon,
                    billing,
                  },
                ]);
                setOpen(false);
                form.reset();
                setSelectedIcon("App");
                setBilling("monthly");
              }}
              className="space-y-4"
            >
              <div>
                <label className="block mb-1 font-medium">Category</label>
                <div className="flex gap-2 mb-2">
                  {ICONS.map(({ name, icon: Icon }) => (
                    <button
                      type="button"
                      key={name}
                      className={`border rounded p-2 flex items-center justify-center ${selectedIcon === name ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}
                      onClick={() => setSelectedIcon(name)}
                      aria-label={name}
                    >
                      <Icon className="w-6 h-6" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="app" className="block mb-1 font-medium">App Name</label>
                <input name="app" id="app" className="w-full border rounded px-2 py-1" />
              </div>
              <div>
                <label htmlFor="billing" className="block mb-1 font-medium">Billing Cycle</label>
                <Select value={billing} onValueChange={setBilling}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="fee" className="block mb-1 font-medium">Amount</label>
                <input name="fee" id="fee" className="w-full border rounded px-2 py-1" type="number" min="0" step="0.01" />
              </div>
              <div>
                <label htmlFor="date" className="block mb-1 font-medium">Subscription Start Date</label>
                <input name="date" id="date" className="w-full border rounded px-2 py-1" type="date" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="submit">Add</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        {/* Subscriptions List Card */}
        <Card>
          <CardHeader>
            <CardTitle>Current Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {subscriptions.length === 0 && <li className="text-gray-400">No subscriptions yet.</li>}
              {subscriptions.map((sub, idx) => {
                const Icon = ICONS.find(i => i.name === sub.icon)?.icon || AppWindow;
                return (
                  <li key={idx} className="border rounded p-3 flex items-center gap-4 bg-white shadow-sm">
                    <Icon className="w-8 h-8 text-blue-500" />
                    <div className="flex-1">
                      <span className="font-medium text-lg block">{sub.app}</span>
                      <span className="text-xs text-gray-500 block">{sub.billing === 'monthly' ? 'Monthly' : 'Yearly'} &bull; ${sub.fee} / {sub.billing}</span>
                      <span className="text-xs text-gray-400 block">Start: {sub.date}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Handle loan submenu items
  if (activeSection === "loan" && activeExpenseCategory === "Housing") {
    return <HousingLoan />;
  }
  if (activeSection === "loan" && activeExpenseCategory === "Vehicle") {
    return <VehicleLoan />;
  }
  if (activeSection === "credit-card" && activeExpenseCategory === "Miles") {
    return <MilesPage />;
  }
  if (activeSection === "income" && activeExpenseCategory === "Salary") {
    return <SalaryIncome />;
  }
  if (activeSection === "income" && activeExpenseCategory === "Rental") {
    return <RentalIncome />;
  }
  if (activeSection === "investments" && activeExpenseCategory === "Crypto") {
    return <CryptoInvestments />;
  }
  if (activeSection === "expenses" && activeExpenseCategory === "Rental") {
    return <ExpenseRental />;
  }
  if (activeSection === "expenses" && activeExpenseCategory === "Insurance") {
    return <ExpenseInsurance />;
  }
  if (activeSection === "expenses" && activeExpenseCategory === "Utilities") {
    return <ExpenseUtilities />;
  }
  if (activeSection === "loan" && activeExpenseCategory === "Education") {
    return <EducationLoan />;
  }
  if (activeSection === "credit-card" && activeExpenseCategory === "Cashback") {
    return <CashbackPage />;
  }
  if (activeSection === "credit-card" && activeExpenseCategory === "Credit Cards") {
    return <CreditCardsPage />;
  }
  if (activeSection === "expenses" && activeExpenseCategory === "Food") {
    return <ExpenseFood />;
  }
  if (activeSection === "investments" && activeExpenseCategory === "Dividends") {
    return <DividendsPage />;
  }
  if (activeSection === "expenses" && activeExpenseCategory === "Transport") {
    return <ExpenseTransport />;
  }
  if (activeSection === "expenses" && activeExpenseCategory === "Vehicle") {
    return <ExpenseVehicle />;
  }
  if (activeSection === "investments" && activeExpenseCategory === "Provident Funds") {
    return <CpfEpfPage />;
  }
  if (activeSection === "tax" && activeExpenseCategory === "Income Tax") {
    return <IncomeTaxPage />;
  }

  switch (activeSection) {
    case "dashboard":
      return <FinancialDashboard />;
    case "portfolio":
      return <div className="p-6"><h2 className="text-2xl font-bold mb-4">Portfolio Management</h2><p>Portfolio content coming soon...</p></div>;
    case "investments":
      return <div className="p-6"><h2 className="text-2xl font-bold mb-4">Investment Tracking</h2><p>Investment tracking content coming soon...</p></div>;
    case "reports":
      return <div className="p-6"><h2 className="text-2xl font-bold mb-4">Financial Reports</h2><p>Reports content coming soon...</p></div>;
    default:
      return <FinancialDashboard />;
  }
} 