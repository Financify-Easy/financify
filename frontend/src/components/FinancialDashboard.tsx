
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export function FinancialDashboard() {
  const stats = [
    {
      title: "Total Balance",
      value: "$124,532.00",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Monthly Expenses",
      value: "$8,240.00",
      change: "-3.2%",
      trend: "down",
      icon: CreditCard,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Investments",
      value: "$45,890.00",
      change: "+8.1%",
      trend: "up",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Savings Goal",
      value: "68%",
      change: "+5.4%",
      trend: "up",
      icon: PieChart,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const recentTransactions = [
    { name: "Apple Inc.", amount: "-$1,234.00", type: "Stock Purchase", time: "2 hours ago" },
    { name: "Salary Deposit", amount: "+$5,000.00", type: "Income", time: "1 day ago" },
    { name: "Netflix", amount: "-$15.99", type: "Subscription", time: "2 days ago" },
    { name: "Grocery Store", amount: "-$156.73", type: "Expense", time: "3 days ago" },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your financial overview.</p>
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last year</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Performance Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>Your investment growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <p className="text-gray-600">Chart visualization would go here</p>
                <p className="text-sm text-gray-500 mt-2">Integrate with your preferred charting library</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest financial activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{transaction.name}</div>
                    <div className="text-sm text-gray-500">{transaction.type}</div>
                    <div className="text-xs text-gray-400">{transaction.time}</div>
                  </div>
                  <div className={`font-semibold ${
                    transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Budget</CardTitle>
            <CardDescription>Track your spending across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: "Housing", spent: 1200, budget: 1500, color: "bg-blue-500" },
                { category: "Food", spent: 450, budget: 600, color: "bg-green-500" },
                { category: "Transportation", spent: 320, budget: 400, color: "bg-yellow-500" },
                { category: "Entertainment", spent: 180, budget: 200, color: "bg-purple-500" },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-gray-500">${item.spent} / ${item.budget}</span>
                  </div>
                  <Progress 
                    value={(item.spent / item.budget) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Investment Allocation</CardTitle>
            <CardDescription>Your portfolio distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Stocks", percentage: 45, amount: "$20,650", color: "bg-blue-500" },
                { type: "Bonds", percentage: 25, amount: "$11,472", color: "bg-green-500" },
                { type: "ETFs", percentage: 20, amount: "$9,178", color: "bg-yellow-500" },
                { type: "Cash", percentage: 10, amount: "$4,590", color: "bg-gray-500" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="font-medium">{item.type}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{item.percentage}%</div>
                    <div className="text-sm text-gray-500">{item.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
