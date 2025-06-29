import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { MoreHorizontal, FileText, Zap, Droplet, Wifi, Calendar } from "lucide-react";

export function ExpenseUtilities() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-yellow-100 rounded-lg">
          <MoreHorizontal className="w-8 h-8 text-yellow-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Utilities Expenses</h1>
          <p className="text-gray-600">Track your monthly utility bills and payments</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Electricity
          </CardTitle>
          <CardDescription>Monthly electricity bill</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm">Due: 2024-06-10</span>
          </div>
          <div className="font-semibold text-blue-700 mb-2">$90</div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-500" />
            <a href="#" className="text-blue-700 underline">View Bill</a>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplet className="w-5 h-5 text-blue-400" />
            Water
          </CardTitle>
          <CardDescription>Monthly water bill</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm">Due: 2024-06-10</span>
          </div>
          <div className="font-semibold text-blue-700 mb-2">$30</div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-500" />
            <a href="#" className="text-blue-700 underline">View Bill</a>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="w-5 h-5 text-green-500" />
            Internet
          </CardTitle>
          <CardDescription>Monthly internet bill</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm">Due: 2024-06-10</span>
          </div>
          <div className="font-semibold text-blue-700 mb-2">$50</div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-500" />
            <a href="#" className="text-blue-700 underline">View Bill</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 