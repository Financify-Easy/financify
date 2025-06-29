import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { DollarSign, FileText, Shield, Calendar } from "lucide-react";

export function ExpenseInsurance() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-100 rounded-lg">
          <Shield className="w-8 h-8 text-purple-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Insurance Expenses</h1>
          <p className="text-gray-600">Track your insurance policies and premium payments</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Active Policies
          </CardTitle>
          <CardDescription>Your current insurance coverage</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex flex-col md:flex-row md:items-center md:gap-4">
              <span className="font-semibold">Health Insurance</span>
              <span className="text-xs text-gray-500">AIA Vitality</span>
              <span className="text-xs text-gray-500 flex items-center gap-1"><Calendar className="w-4 h-4" />Renewal: 2025-01-01</span>
              <span className="font-semibold text-blue-700">$120/month</span>
            </li>
            <li className="flex flex-col md:flex-row md:items-center md:gap-4">
              <span className="font-semibold">Car Insurance</span>
              <span className="text-xs text-gray-500">AXA Motor</span>
              <span className="text-xs text-gray-500 flex items-center gap-1"><Calendar className="w-4 h-4" />Renewal: 2024-09-15</span>
              <span className="font-semibold text-blue-700">$80/month</span>
            </li>
            <li className="flex flex-col md:flex-row md:items-center md:gap-4">
              <span className="font-semibold">Home Insurance</span>
              <span className="text-xs text-gray-500">Great Eastern</span>
              <span className="text-xs text-gray-500 flex items-center gap-1"><Calendar className="w-4 h-4" />Renewal: 2025-03-10</span>
              <span className="font-semibold text-blue-700">$30/month</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Payment History
          </CardTitle>
          <CardDescription>Recent insurance premium payments</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>May 2024</span>
              <span className="font-semibold text-green-700">$230</span>
            </li>
            <li className="flex justify-between">
              <span>April 2024</span>
              <span className="font-semibold text-green-700">$230</span>
            </li>
            <li className="flex justify-between">
              <span>March 2024</span>
              <span className="font-semibold text-green-700">$230</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
} 