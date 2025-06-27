import { 
  TrendingUp, 
  PieChart, 
  Wallet, 
  BarChart3, 
  Settings, 
  CreditCard,
  DollarSign,
  TrendingDown,
  ChevronRight
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar";

const mainItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    id: "dashboard",
    hasSubmenu: true,
  },
  {
    title: "Portfolio",
    icon: PieChart,
    id: "portfolio",
    hasSubmenu: true,
  },
  {
    title: "Investments",
    icon: TrendingUp,
    id: "investments",
    hasSubmenu: true,
  },
  {
    title: "Reports",
    icon: Wallet,
    id: "reports",
    hasSubmenu: true,
  },
  {
    title: "Expenses",
    icon: TrendingDown,
    id: "expenses",
    hasSubmenu: true,
    categories: [
      "Food",
      "Monthly Subscription",
      "Transport",
      "Shopping",
      "Other"
    ]
  },
  {
    title: "Credit Card",
    icon: CreditCard,
    id: "credit-card",
    hasSubmenu: true,
  },
  {
    title: "Loan",
    icon: DollarSign,
    id: "loan",
    hasSubmenu: true,
  },
];

interface AppSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  setSecondarySidebarOpen: (open: boolean) => void;
  setActiveExpenseCategory: (category: string) => void;
}

export function AppSidebar({ activeSection, setActiveSection, setSecondarySidebarOpen, setActiveExpenseCategory }: AppSidebarProps) {
  const handleItemClick = (id: string) => {
    setActiveSection(id);
    setSecondarySidebarOpen(true);
  };

  return (
    <Sidebar className="border-r-2 border-blue-100">
      <SidebarHeader className="p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="flex items-center gap-2">
          <DollarSign className="w-8 h-8 text-white" />
          <div>
            <h2 className="text-lg font-bold text-white">Financify</h2>
            <p className="text-xs text-blue-100">Keep your finances in check</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 font-medium">
            Financial Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => handleItemClick(item.id)}
                    className={`hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 ${
                      activeSection === item.id ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600' : ''
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                    {item.hasSubmenu && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 font-medium">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="hover:bg-green-50 hover:text-green-700">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Add Transaction</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="hover:bg-orange-50 hover:text-orange-700">
                  <CreditCard className="w-5 h-5 text-orange-600" />
                  <span>Pay Bills</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="hover:bg-red-50 hover:text-red-700">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                  <span>Set Budget</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t bg-gray-50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="hover:bg-gray-100">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
