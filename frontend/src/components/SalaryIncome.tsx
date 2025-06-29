import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Gift, TrendingUp, PlusCircle } from "lucide-react";

export function SalaryIncome() {
  const [payslips, setPayslips] = useState<{ name: string; url: string }[]>([]);
  const [bonus, setBonus] = useState([
    { year: 2023, amount: 5000 },
    { year: 2022, amount: 4000 },
  ]);
  const [compensation, setCompensation] = useState([
    { year: 2023, type: "Stock Grant", amount: 2000 },
    { year: 2022, type: "Allowance", amount: 1200 },
  ]);
  const [increments, setIncrements] = useState([
    { year: 2021, amount: 60000 },
    { year: 2022, amount: 63000 },
    { year: 2023, amount: 67000 },
  ]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handle payslip upload (mock)
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    setUploading(true);
    setTimeout(() => {
      setPayslips([
        ...payslips,
        { name: selectedFile.name, url: URL.createObjectURL(selectedFile) },
      ]);
      setUploading(false);
      setSelectedFile(null);
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-100 rounded-lg">
          <Upload className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Salary & Income</h1>
          <p className="text-gray-600">Track your payslips, bonuses, compensation, and yearly increments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payslip Upload & List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Payslips
            </CardTitle>
            <CardDescription>Upload and view your payslips</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex gap-2 mb-4" onSubmit={handleUpload}>
              <Input type="file" accept="application/pdf,image/*" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
              <Button type="submit" disabled={uploading || !selectedFile}>
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </form>
            <ul className="space-y-2">
              {payslips.map((file, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                    {file.name}
                  </a>
                </li>
              ))}
              {payslips.length === 0 && <li className="text-gray-400">No payslips uploaded yet.</li>}
            </ul>
          </CardContent>
        </Card>

        {/* Bonus & Compensation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              Bonus & Compensation
            </CardTitle>
            <CardDescription>Track your bonuses and work compensation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="font-semibold mb-1">Bonuses</div>
              <ul className="space-y-1">
                {bonus.map((b, idx) => (
                  <li key={idx} className="flex justify-between text-sm">
                    <span>{b.year}</span>
                    <span className="font-bold text-green-700">${b.amount.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-1">Work Compensation</div>
              <ul className="space-y-1">
                {compensation.map((c, idx) => (
                  <li key={idx} className="flex justify-between text-sm">
                    <span>{c.year} - {c.type}</span>
                    <span className="font-bold text-blue-700">${c.amount.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Yearly Increment Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Yearly Increment Tracker
          </CardTitle>
          <CardDescription>See your salary growth over the years</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-[300px] w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-2 px-4 text-left">Year</th>
                  <th className="py-2 px-4 text-left">Annual Salary</th>
                  <th className="py-2 px-4 text-left">Increment</th>
                </tr>
              </thead>
              <tbody>
                {increments.map((inc, idx) => {
                  const prev = increments[idx - 1]?.amount || 0;
                  const diff = prev ? inc.amount - prev : 0;
                  const percent = prev ? ((diff / prev) * 100).toFixed(1) : "-";
                  return (
                    <tr key={inc.year} className="border-b">
                      <td className="py-2 px-4">{inc.year}</td>
                      <td className="py-2 px-4 font-bold">${inc.amount.toLocaleString()}</td>
                      <td className="py-2 px-4">
                        {diff > 0 ? (
                          <span className="text-green-700 font-semibold">+${diff.toLocaleString()} ({percent}%)</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 