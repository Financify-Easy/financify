
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SecondarySidebar } from "@/components/SecondarySidebar";
import { FinancialDashboard } from "@/components/FinancialDashboard";
import { useState } from "react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [secondarySidebarOpen, setSecondarySidebarOpen] = useState(false);

  const renderContent = () => {
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
