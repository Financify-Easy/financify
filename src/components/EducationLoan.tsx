import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Briefcase, DollarSign, Calendar, Info } from "lucide-react";

export function EducationLoan() {
  // Mock data
  const loanData = {
    institution: "National University of Singapore",
    course: "Bachelor of Computing",
    loanAmount: 40000,
    interestRate: 3.5,
    loanTerm: 10, // years
    monthlyPayment: 395,
    totalPaid: 12000,
    totalDue: 40000,
    nextDue: "2024-07-01",
    progress: 30, // percent
    paymentSchedule: [
      { month: "May 2024", amount: 395, status: "Paid" },
      { month: "June 2024", amount: 395, status: "Due" },
      { month: "July 2024", amount: 395, status: "Upcoming" },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-100 rounded-lg">
          <Briefcase className="w-8 h-8 text-orange-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Education Loan</h1>
          <p className="text-gray-600">Track your education loan details and payments</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Loan Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Institution</span>
            <span className="font-semibold">{loanData.institution}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Course</span>
            <span className="font-semibold">{loanData.course}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Loan Amount</span>
            <span className="font-semibold text-blue-700">${loanData.loanAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Interest Rate</span>
            <span className="font-semibold text-green-700">{loanData.interestRate}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Loan Term</span>
            <span className="font-semibold">{loanData.loanTerm} years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Monthly Payment</span>
            <span className="font-semibold text-purple-700">${loanData.monthlyPayment}</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Payment Schedule
          </CardTitle>
          <CardDescription>Recent and upcoming payments</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {loanData.paymentSchedule.map((p, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <span>{p.month}</span>
                <span className={
                  p.status === "Paid"
                    ? "text-green-700 font-semibold"
                    : p.status === "Due"
                    ? "text-red-700 font-semibold"
                    : "text-gray-500 font-semibold"
                }>
                  {p.status} - ${p.amount}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Loan Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex justify-between text-sm">
            <span>Paid: ${loanData.totalPaid.toLocaleString()}</span>
            <span>Remaining: ${loanData.totalDue - loanData.totalPaid}</span>
          </div>
          <Progress value={loanData.progress} className="h-3" />
          <div className="text-xs text-gray-500 mt-1">{loanData.progress}% paid off</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" />
            Tips & Notices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Consider making extra payments to reduce interest over time.</li>
            <li>Check for available loan deferment or refinancing options.</li>
            <li>Keep track of your payment schedule to avoid late fees.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
} 