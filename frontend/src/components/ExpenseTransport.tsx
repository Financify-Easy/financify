import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Bus, Train, Car, TrendingUp } from "lucide-react";
import { Bar } from "react-chartjs-2";
import { useMemo } from "react";
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

const MOCK_TRANSPORT = [
  { date: "2024-05-01", mode: "Bus", amount: 1.80 },
  { date: "2024-05-02", mode: "Train", amount: 2.10 },
  { date: "2024-05-03", mode: "Bus", amount: 1.80 },
  { date: "2024-05-04", mode: "Train", amount: 2.20 },
  { date: "2024-05-05", mode: "Bus", amount: 1.70 },
  { date: "2024-05-06", mode: "Train", amount: 2.00 },
  { date: "2024-05-07", mode: "Bus", amount: 1.90 },
  { date: "2024-05-08", mode: "Grab", amount: 12.50 },
  { date: "2024-05-09", mode: "Uber", amount: 15.00 },
  { date: "2024-05-10", mode: "Grab", amount: 10.00 },
  { date: "2024-05-11", mode: "Uber", amount: 13.00 },
  { date: "2024-05-12", mode: "Bus", amount: 1.80 },
  { date: "2024-05-13", mode: "Train", amount: 2.10 },
];

export function ExpenseTransport() {
  const total = MOCK_TRANSPORT.reduce((sum, t) => sum + t.amount, 0);
  const recentTrips = MOCK_TRANSPORT.slice(-7).reverse();

  // Spend by mode
  const modeStats = useMemo(() => {
    const stats = {};
    MOCK_TRANSPORT.forEach(t => {
      if (!stats[t.mode]) stats[t.mode] = 0;
      stats[t.mode] += t.amount;
    });
    return stats;
  }, []);

  const barData = {
    labels: Object.keys(modeStats),
    datasets: [
      {
        label: "Total Spent ($)",
        data: Object.values(modeStats),
        backgroundColor: ["#6366f1", "#10b981", "#f59e42", "#f43f5e"],
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-yellow-100 rounded-lg">
          <Car className="w-8 h-8 text-yellow-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transport Expenses</h1>
          <p className="text-gray-600">Track all your transport costs, including public transport and e-hailing services</p>
        </div>
      </div>
      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>All transport trips</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-700">${total.toFixed(2)}</div>
        </CardContent>
      </Card>
      {/* Recent Trips Card */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Trips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recentTrips.map((trip, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  {trip.mode === "Bus" && <Bus className="w-4 h-4 text-blue-500" />}
                  {trip.mode === "Train" && <Train className="w-4 h-4 text-green-500" />}
                  {(trip.mode === "Grab" || trip.mode === "Uber") && <Car className="w-4 h-4 text-yellow-600" />}
                  {trip.mode}
                </span>
                <span className="text-gray-500">{trip.date}</span>
                <span className="font-semibold">${trip.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      {/* Chart Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            Spend by Mode
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