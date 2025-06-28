import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Car, Fuel, Wrench, MoreHorizontal } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const MOCK_VEHICLE = {
  Petrol: [
    { date: "2024-05-01", amount: 60.0, station: "Shell" },
    { date: "2024-05-10", amount: 55.0, station: "Caltex" },
    { date: "2024-05-20", amount: 62.5, station: "SPC" },
  ],
  Maintenance: [
    { date: "2024-05-05", amount: 180.0, desc: "Oil Change" },
    { date: "2024-05-18", amount: 90.0, desc: "Tire Rotation" },
  ],
  Other: [
    { date: "2024-05-15", amount: 30.0, desc: "Car Wash" },
  ],
};

function getTotal(arr) {
  return arr.reduce((sum, t) => sum + t.amount, 0);
}

export function ExpenseVehicle() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-yellow-100 rounded-lg">
          <Car className="w-8 h-8 text-yellow-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vehicle Expenses</h1>
          <p className="text-gray-600">Track your petrol, maintenance, and other vehicle costs</p>
        </div>
      </div>
      <Tabs defaultValue="Petrol" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="Petrol">Petrol</TabsTrigger>
          <TabsTrigger value="Maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="Other">Other</TabsTrigger>
        </TabsList>
        <TabsContent value="Petrol">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Fuel className="w-5 h-5 text-yellow-500" />Petrol</CardTitle>
              <CardDescription>Total petrol spend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-blue-700 mb-2">${getTotal(MOCK_VEHICLE.Petrol).toFixed(2)}</div>
              <ul className="space-y-2">
                {MOCK_VEHICLE.Petrol.map((t, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{t.date} - {t.station}</span>
                    <span>${t.amount.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Maintenance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Wrench className="w-5 h-5 text-green-500" />Maintenance</CardTitle>
              <CardDescription>Total maintenance spend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-blue-700 mb-2">${getTotal(MOCK_VEHICLE.Maintenance).toFixed(2)}</div>
              <ul className="space-y-2">
                {MOCK_VEHICLE.Maintenance.map((t, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{t.date} - {t.desc}</span>
                    <span>${t.amount.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Other">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MoreHorizontal className="w-5 h-5 text-gray-500" />Other</CardTitle>
              <CardDescription>Other vehicle-related expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-blue-700 mb-2">${getTotal(MOCK_VEHICLE.Other).toFixed(2)}</div>
              <ul className="space-y-2">
                {MOCK_VEHICLE.Other.map((t, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{t.date} - {t.desc}</span>
                    <span>${t.amount.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 