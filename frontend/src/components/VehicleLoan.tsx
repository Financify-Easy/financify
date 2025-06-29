import { Car, DollarSign, Percent, Calendar, TrendingUp, Calculator, FileText, Clock, AlertCircle, BadgeDollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function VehicleLoan() {
  // Mock data - in a real app this would come from props or API
  const loanData = {
    vehicle: {
      make: "Toyota",
      model: "Camry SE",
      year: 2022,
      vin: "4T1G11AK2NU123456",
      color: "Midnight Black Metallic",
      mileage: 12000,
      image: "https://cdn.motor1.com/images/mgl/0ANJb/s1/2022-toyota-camry.jpg"
    },
    loanAmount: 28000,
    downPayment: 4000,
    interestRate: 3.9,
    loanTerm: 5,
    monthlyPayment: 495.23,
    loanStartDate: "2023-03-01",
    remainingBalance: 24500,
    totalInterestPaid: 1200,
    principalPaid: 3500,
    nextPaymentDate: "2024-01-20",
    insurance: 1100,
    registration: 200,
    maintenance: 300,
    totalMonthlyExpense: 587.73,
    lender: "AutoFinance Bank",
    payoffDate: "2028-03-01",
    extraPayments: 0,
    lateFees: 0,
    status: "Active"
  };

  const calculateLoanProgress = () => {
    return ((loanData.loanAmount - loanData.remainingBalance) / loanData.loanAmount) * 100;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-100 rounded-lg">
          <Car className="w-8 h-8 text-orange-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vehicle Loan</h1>
          <p className="text-gray-600">Track your auto loan and vehicle details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle & Loan Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vehicle Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5" />
                Vehicle Information
              </CardTitle>
              <CardDescription>Your car and loan details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <img src={loanData.vehicle.image} alt="Vehicle" className="w-40 h-28 object-cover rounded-lg border" />
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Make & Model</label>
                    <p className="text-lg font-semibold">{loanData.vehicle.year} {loanData.vehicle.make} {loanData.vehicle.model}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">VIN</label>
                    <p className="text-lg font-semibold">{loanData.vehicle.vin}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Color</label>
                    <p className="text-lg font-semibold">{loanData.vehicle.color}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Mileage</label>
                    <p className="text-lg font-semibold">{loanData.vehicle.mileage.toLocaleString()} miles</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loan Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Loan Progress
              </CardTitle>
              <CardDescription>Track your auto loan payoff progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Principal Paid</span>
                  <span className="font-medium">{formatCurrency(loanData.principalPaid)}</span>
                </div>
                <Progress value={calculateLoanProgress()} className="h-3" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Remaining Balance</span>
                  <span>{formatCurrency(loanData.remainingBalance)}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{formatCurrency(loanData.principalPaid)}</p>
                  <p className="text-sm text-gray-600">Principal Paid</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(loanData.totalInterestPaid)}</p>
                  <p className="text-sm text-gray-600">Interest Paid</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Monthly Payment Breakdown
              </CardTitle>
              <CardDescription>Detailed breakdown of your monthly auto expenses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Principal & Interest</span>
                  <span className="font-semibold">{formatCurrency(loanData.monthlyPayment)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Insurance</span>
                  <span className="font-semibold">{formatCurrency(loanData.insurance / 12)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Registration</span>
                  <span className="font-semibold">{formatCurrency(loanData.registration / 12)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Maintenance</span>
                  <span className="font-semibold">{formatCurrency(loanData.maintenance / 12)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total Monthly Payment</span>
                    <span className="text-xl font-bold text-orange-600">{formatCurrency(loanData.totalMonthlyExpense)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Loan Details */}
        <div className="space-y-6">
          {/* Loan Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Loan Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Original Loan</span>
                  <span className="font-semibold">{formatCurrency(loanData.loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Down Payment</span>
                  <span className="font-semibold text-green-600">{formatCurrency(loanData.downPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Interest Rate</span>
                  <span className="font-semibold text-orange-600">{loanData.interestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Loan Term</span>
                  <span className="font-semibold">{loanData.loanTerm} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Lender</span>
                  <span className="font-semibold">{loanData.lender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="font-semibold">{loanData.status}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Payment Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Next Payment</span>
                  <span className="font-semibold">{formatDate(loanData.nextPaymentDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Loan Start Date</span>
                  <span className="font-semibold">{formatDate(loanData.loanStartDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Payoff Date</span>
                  <span className="font-semibold">{formatDate(loanData.payoffDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Payment Amount</span>
                  <span className="font-semibold">{formatCurrency(loanData.totalMonthlyExpense)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full p-3 text-left bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-orange-600" />
                  <span className="font-medium">Calculate Refinance</span>
                </div>
              </button>
              <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Make Extra Payment</span>
                </div>
              </button>
              <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">Download Statement</span>
                </div>
              </button>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <AlertCircle className="w-5 h-5" />
                Important Notice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-orange-700">
                Your vehicle registration is due soon. Ensure your insurance and maintenance are up to date to avoid late fees.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 