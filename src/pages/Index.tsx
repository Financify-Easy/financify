import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SecondarySidebar } from "@/components/SecondarySidebar";
import { FinancialDashboard } from "@/components/FinancialDashboard";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [secondarySidebarOpen, setSecondarySidebarOpen] = useState(false);
  const [activeExpenseCategory, setActiveExpenseCategory] = useState("");
  const [subscriptions, setSubscriptions] = useState([
    // Example: { app: "Netflix", fee: 15.99, date: "2023-01-01" }
  ]);
  const [open, setOpen] = useState(false);

  const renderContent = () => {
    if (activeSection === "expenses" && activeExpenseCategory === "Monthly Subscription") {
      return (
        <div className="p-6 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">My App Subscriptions</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="mb-4">Add Subscription</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Subscription</DialogTitle>
                <DialogDescription>Enter your app subscription details below.</DialogDescription>
              </DialogHeader>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const app = (form.elements.namedItem('app') as HTMLInputElement).value;
                  const fee = (form.elements.namedItem('fee') as HTMLInputElement).value;
                  const date = (form.elements.namedItem('date') as HTMLInputElement).value;
                  if (!app || !fee || !date) return;
                  setSubscriptions([...subscriptions, { app, fee: parseFloat(fee), date }]);
                  setOpen(false);
                  form.reset();
                }}
                className="space-y-2"
              >
                <input name="app" className="w-full border rounded px-2 py-1" placeholder="App Name" />
                <input name="fee" className="w-full border rounded px-2 py-1" placeholder="Monthly Fee" type="number" min="0" step="0.01" />
                <input name="date" className="w-full border rounded px-2 py-1" placeholder="Date Subscribed" type="date" />
                <div className="flex justify-end gap-2 pt-2">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Add</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          <h4 className="font-semibold mb-2 mt-6">Current Subscriptions</h4>
          <ul className="space-y-2">
            {subscriptions.length === 0 && <li className="text-gray-400">No subscriptions yet.</li>}
            {subscriptions.map((sub, idx) => (
              <li key={idx} className="border rounded p-3 flex flex-col bg-white shadow-sm">
                <span className="font-medium text-lg">{sub.app}</span>
                <span className="text-xs text-gray-500">${sub.fee} / month</span>
                <span className="text-xs text-gray-400">Subscribed: {sub.date}</span>
              </li>
            ))}
          </ul>
        </div>
      );
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
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          setSecondarySidebarOpen={setSecondarySidebarOpen}
          setActiveExpenseCategory={setActiveExpenseCategory}
        />
        <SecondarySidebar 
          isOpen={secondarySidebarOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
