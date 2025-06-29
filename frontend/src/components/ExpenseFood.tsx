import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { PieChart, Utensils, Calendar, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Mock food expense data
const MOCK_FOOD_EXPENSES = [
  { amount: 12.5, date: "2024-05-01", cuisine: "Japanese" },
  { amount: 8.2, date: "2024-05-03", cuisine: "Chinese" },
  { amount: 15.0, date: "2024-05-05", cuisine: "Western" },
  { amount: 6.8, date: "2024-05-07", cuisine: "Malay" },
  { amount: 22.0, date: "2024-05-10", cuisine: "Japanese" },
  { amount: 9.5, date: "2024-05-12", cuisine: "Indian" },
  { amount: 5.0, date: "2024-05-13", cuisine: "Chinese" },
  { amount: 18.0, date: "2024-05-15", cuisine: "Western" },
  { amount: 7.5, date: "2024-05-18", cuisine: "Malay" },
  { amount: 13.0, date: "2024-05-20", cuisine: "Japanese" },
  { amount: 10.0, date: "2024-05-22", cuisine: "Indian" },
  { amount: 8.0, date: "2024-05-25", cuisine: "Chinese" },
  { amount: 20.0, date: "2024-05-28", cuisine: "Western" },
  { amount: 6.0, date: "2024-05-29", cuisine: "Malay" },
];

export function ExpenseFood() {
  // Calculate stats
  const total = MOCK_FOOD_EXPENSES.reduce((sum, e) => sum + e.amount, 0);
  const max = Math.max(...MOCK_FOOD_EXPENSES.map(e => e.amount));
  const min = Math.min(...MOCK_FOOD_EXPENSES.map(e => e.amount));

  // Cuisine stats
  const cuisineStats = useMemo(() => {
    const stats: Record<string, { count: number; total: number }> = {};
    MOCK_FOOD_EXPENSES.forEach(e => {
      if (!stats[e.cuisine]) stats[e.cuisine] = { count: 0, total: 0 };
      stats[e.cuisine].count++;
      stats[e.cuisine].total += e.amount;
    });
    return stats;
  }, []);

  // Bar chart data: Spend by cuisine
  const barData = {
    labels: Object.keys(cuisineStats),
    datasets: [
      {
        label: "Total Spent ($)",
        data: Object.values(cuisineStats).map(s => s.total),
        backgroundColor: [
          "#6366f1",
          "#f59e42",
          "#10b981",
          "#f43f5e",
          "#fbbf24",
        ],
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-pink-100 rounded-lg">
          <Utensils className="w-8 h-8 text-pink-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Food Expenses</h1>
          <p className="text-gray-600">Track your food spending and cuisine choices</p>
        </div>
      </div>
      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Food Spend Summary</CardTitle>
          <CardDescription>Overview of your food expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-8 text-lg">
            <div>
              <span className="block text-gray-500 text-sm">Total Spent</span>
              <span className="font-bold text-blue-700">${total.toFixed(2)}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-sm">Max Single Spend</span>
              <span className="font-bold text-green-700">${max.toFixed(2)}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-sm">Min Single Spend</span>
              <span className="font-bold text-red-700">${min.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Cuisine Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle>Cuisine Types</CardTitle>
          <CardDescription>What you've eaten recently</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {Object.entries(cuisineStats).map(([cuisine, stat]) => (
              <li key={cuisine} className="flex justify-between">
                <span className="font-medium">{cuisine}</span>
                <span className="text-gray-500">{stat.count}x &bull; ${stat.total.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      {/* Chart Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-indigo-500" />
            Spend by Cuisine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-xl">
            <Bar data={barData} options={{
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