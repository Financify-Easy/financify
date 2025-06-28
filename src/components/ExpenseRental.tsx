import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Home, FileText, DollarSign, User } from "lucide-react";

export function ExpenseRental() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Home className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rental Expenses</h1>
          <p className="text-gray-600">Track your rental payments and lease details</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Current Lease
          </CardTitle>
          <CardDescription>Details of your current rental</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-green-600" />
            <span className="font-semibold">Landlord: John Doe</span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <Home className="w-4 h-4 text-blue-600" />
            <span className="font-semibold">123 Main Street, Springfield</span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="font-semibold">$2,000 / month</span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-500" />
            <a href="#" className="text-blue-700 underline">View Lease Agreement</a>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Payment History
          </CardTitle>
          <CardDescription>Recent rental payments</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>May 2024</span>
              <span className="font-semibold text-green-700">$2,000</span>
            </li>
            <li className="flex justify-between">
              <span>April 2024</span>
              <span className="font-semibold text-green-700">$2,000</span>
            </li>
            <li className="flex justify-between">
              <span>March 2024</span>
              <span className="font-semibold text-green-700">$2,000</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
} 