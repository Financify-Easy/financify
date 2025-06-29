import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SecondarySidebar } from "@/components/SecondarySidebar";
import { FinancialDashboard } from "@/components/FinancialDashboard";
import Subscriptions from "@/components/MainContent";
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
          activeExpenseCategory={activeExpenseCategory}
          setActiveExpenseCategory={setActiveExpenseCategory}
        />
        <main className="flex-1 overflow-auto">
          <Subscriptions
            activeSection={activeSection}
            activeExpenseCategory={activeExpenseCategory}
            subscriptions={subscriptions}
            setSubscriptions={setSubscriptions}
            open={open}
            setOpen={setOpen}
          />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
