import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { DollarSign, TrendingUp, Building2 } from "lucide-react";

const MOCK_DIVIDENDS = [
  { company: "Apple Inc.", symbol: "AAPL", amount: 120.50, date: "2024-03-15" },
  { company: "Microsoft Corp.", symbol: "MSFT", amount: 98.75, date: "2024-03-20" },
  { company: "Coca-Cola Co.", symbol: "KO", amount: 45.00, date: "2024-04-01" },
  { company: "Starbucks Corp.", symbol: "SBUX", amount: 32.10, date: "2024-04-10" },
  { company: "Apple Inc.", symbol: "AAPL", amount: 130.00, date: "2024-06-15" },
  { company: "Microsoft Corp.", symbol: "MSFT", amount: 105.00, date: "2024-06-20" },
];

export function DividendsPage() {
  const totalDividends = MOCK_DIVIDENDS.reduce((sum, d) => sum + d.amount, 0);
  const companies = Array.from(new Set(MOCK_DIVIDENDS.map(d => d.company)));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-100 rounded-lg">
          <DollarSign className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dividends</h1>
          <p className="text-gray-600">Track your dividend payouts and returns from investments</p>
        </div>
      </div>
      {/* Total Returns Card */}
      <Card>
        <CardHeader>
          <CardTitle>Total Dividend Returns</CardTitle>
          <CardDescription>All companies combined</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-700">${totalDividends.toFixed(2)}</div>
        </CardContent>
      </Card>
      {/* Companies List Card */}
      <Card>
        <CardHeader>
          <CardTitle>Companies & Payouts</CardTitle>
          <CardDescription>Recent dividend payouts by company</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {companies.map(company => {
              const payouts = MOCK_DIVIDENDS.filter(d => d.company === company);
              const total = payouts.reduce((sum, d) => sum + d.amount, 0);
              return (
                <li key={company} className="border rounded p-3 bg-white shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-5 h-5 text-gray-500" />
                    <span className="font-semibold">{company}</span>
                    <span className="text-xs text-gray-400 ml-2">({payouts[0].symbol})</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-1">Total: <span className="font-bold text-green-700">${total.toFixed(2)}</span></div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {payouts.map((p, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>{p.date}</span>
                        <span>${p.amount.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
} 