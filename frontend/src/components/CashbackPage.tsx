import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Info } from "lucide-react";
import { useState } from "react";

const MOCK_CARD = {
  name: "UOB One Card",
  cashbackCap: 100, // $100 per month
  terms: [
    "Cashback is capped at $100 per month.",
    "Minimum spend of $500 to qualify for cashback.",
    "Selected categories only: groceries, online shopping, dining.",
    "Cashback credited in the following month.",
  ],
};

export function CashbackPage() {
  // Mock state for spend
  const [monthlySpend, setMonthlySpend] = useState(320); // Example: $320 spent this month
  const progress = Math.min((monthlySpend / 500) * 100, 100); // Assume $500 is the minimum for cashback
  const cashbackProgress = Math.min((monthlySpend / 1000) * 100, 100); // Assume $1000 spend = $100 cap

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-100 rounded-lg">
          <DollarSign className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cashback Progress</h1>
          <p className="text-gray-600">Track your monthly cashback and spending</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{MOCK_CARD.name} Cashback Cap</CardTitle>
          <CardDescription>Monthly cashback cap: <span className="font-semibold text-blue-700">${MOCK_CARD.cashbackCap}</span></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex justify-between text-sm">
            <span>Spent this month:</span>
            <span className="font-semibold">${monthlySpend}</span>
          </div>
          <Progress value={cashbackProgress} className="h-3" />
          <div className="text-xs text-gray-500 mt-1">{cashbackProgress}% of cap reached</div>
          <div className="mt-4">
            <div className="font-semibold mb-1">Terms & Conditions</div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {MOCK_CARD.terms.map((t, idx) => <li key={idx}>{t}</li>)}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 