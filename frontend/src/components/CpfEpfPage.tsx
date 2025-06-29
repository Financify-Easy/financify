import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { DollarSign, TrendingUp, Banknote } from "lucide-react";
import { Bar } from "react-chartjs-2";

const MOCK_BALANCES = [
  { type: "Ordinary Account", balance: 25000 },
  { type: "Special Account", balance: 18000 },
  { type: "Medisave Account", balance: 12000 },
];

const MOCK_TRANSACTIONS = [
  { date: "2024-06-01", type: "Contribution", amount: 1200 },
  { date: "2024-05-01", type: "Contribution", amount: 1200 },
  { date: "2024-04-01", type: "Contribution", amount: 1200 },
  { date: "2024-03-15", type: "Withdrawal", amount: -500 },
];

const MOCK_HISTORY = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Total Balance",
      data: [42000, 43000, 44000, 44700, 45900, 47000],
      backgroundColor: "#6366f1",
    },
  ],
};

export function CpfEpfPage() {
  const total = MOCK_BALANCES.reduce((sum, a) => sum + a.balance, 0);
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-100 rounded-lg">
          <Banknote className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Provident Funds</h1>
          <p className="text-gray-600">Track your provident fund balances and contributions</p>
        </div>
      </div>
      {/* Balances Card */}
      <Card>
        <CardHeader>
          <CardTitle>Account Balances</CardTitle>
          <CardDescription>Current balances by account type</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {MOCK_BALANCES.map((a, idx) => (
              <li key={idx} className="flex justify-between">
                <span className="font-medium">{a.type}</span>
                <span className="font-bold text-blue-700">${a.balance.toLocaleString()}</span>
              </li>
            ))}
            <li className="flex justify-between border-t pt-2 mt-2">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-green-700">${total.toLocaleString()}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      {/* Transactions Card */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Contributions & Withdrawals</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {MOCK_TRANSACTIONS.map((t, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{t.date}</span>
                <span className={t.amount > 0 ? "text-green-700" : "text-red-700"}>{t.amount > 0 ? "+" : "-"}${Math.abs(t.amount)}</span>
                <span className="text-xs text-gray-500">{t.type}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      {/* History Chart Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            Historical Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-xl">
            <Bar data={MOCK_HISTORY} options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: false },
              },
            }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 