import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { DollarSign, CheckCircle, XCircle, Info } from "lucide-react";

const MOCK_TAX = {
  year: 2024,
  taxableIncome: 85000,
  taxDue: 4200,
  paid: false,
  giroEligible: true,
  recentPayments: [
    { date: "2023-09-01", amount: 350, method: "GIRO" },
    { date: "2023-08-01", amount: 350, method: "GIRO" },
    { date: "2023-07-01", amount: 350, method: "GIRO" },
  ],
};

export function IncomeTaxPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-100 rounded-lg">
          <DollarSign className="w-8 h-8 text-orange-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Income Tax</h1>
          <p className="text-gray-600">View your income tax details, payment status, and GIRO options</p>
        </div>
      </div>
      {/* Tax Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Summary ({MOCK_TAX.year})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-8 text-lg">
            <div>
              <span className="block text-gray-500 text-sm">Taxable Income</span>
              <span className="font-bold text-blue-700">${MOCK_TAX.taxableIncome.toLocaleString()}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-sm">Tax Due</span>
              <span className="font-bold text-red-700">${MOCK_TAX.taxDue.toLocaleString()}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-sm">Payment Status</span>
              {MOCK_TAX.paid ? (
                <span className="flex items-center gap-1 text-green-700 font-semibold"><CheckCircle className="w-4 h-4" />Paid</span>
              ) : (
                <span className="flex items-center gap-1 text-red-700 font-semibold"><XCircle className="w-4 h-4" />Not Paid</span>
              )}
            </div>
            <div>
              <span className="block text-gray-500 text-sm">GIRO Eligible</span>
              {MOCK_TAX.giroEligible ? (
                <span className="flex items-center gap-1 text-green-700 font-semibold"><CheckCircle className="w-4 h-4" />Yes</span>
              ) : (
                <span className="flex items-center gap-1 text-red-700 font-semibold"><XCircle className="w-4 h-4" />No</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Recent Payments Card */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {MOCK_TAX.recentPayments.map((p, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{p.date}</span>
                <span className="text-blue-700 font-semibold">${p.amount.toLocaleString()}</span>
                <span className="text-xs text-gray-500">{p.method}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      {/* GIRO Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-indigo-500" />
            What is GIRO?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-700">
            <p><b>GIRO</b> is an automatic payment arrangement that allows you to pay your income tax in monthly installments directly from your bank account. It is a convenient and secure way to ensure your tax payments are made on time without manual intervention.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Pay your tax in up to 12 monthly installments</li>
              <li>No late payment penalties as long as GIRO is active</li>
              <li>Easy to set up and manage with your bank</li>
              <li>Can be used for other government payments as well</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 