import { Building, DollarSign, Percent, Calendar, Home, TrendingUp, Calculator, FileText, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function HousingLoan() {
  // Mock data - in a real app this would come from props or API
  const loanData = {
    propertyValue: 450000,
    loanAmount: 360000,
    downPayment: 90000,
    interestRate: 4.25,
    loanTerm: 30,
    monthlyPayment: 1771.23,
    propertyType: "Single Family Home",
    propertyAddress: "123 Maple Street, Springfield, IL 62701",
    loanStartDate: "2023-06-15",
    remainingBalance: 358500,
    totalInterestPaid: 8500,
    principalPaid: 1500,
    nextPaymentDate: "2024-01-15",
    escrowAmount: 450,
    propertyTax: 3200,
    insurance: 1200,
    hoaFees: 0,
    totalMonthlyExpense: 2221.23,
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
        <div className="p-3 bg-blue-100 rounded-lg">
          <Building className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Housing Loan</h1>
          <p className="text-gray-600">Manage your mortgage and property details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Property Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Property Information
              </CardTitle>
              <CardDescription>Details about your property and loan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Property Type</label>
                  <p className="text-lg font-semibold">{loanData.propertyType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Property Value</label>
                  <p className="text-lg font-semibold text-green-600">{formatCurrency(loanData.propertyValue)}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-600">Address</label>
                  <p className="text-lg font-semibold">{loanData.propertyAddress}</p>
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
              <CardDescription>Track your mortgage payoff progress</CardDescription>
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
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(loanData.principalPaid)}</p>
                  <p className="text-sm text-gray-600">Principal Paid</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{formatCurrency(loanData.totalInterestPaid)}</p>
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
              <CardDescription>Detailed breakdown of your monthly housing expenses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Principal & Interest</span>
                  <span className="font-semibold">{formatCurrency(loanData.monthlyPayment)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Property Tax</span>
                  <span className="font-semibold">{formatCurrency(loanData.propertyTax / 12)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Insurance</span>
                  <span className="font-semibold">{formatCurrency(loanData.insurance / 12)}</span>
                </div>
                {loanData.hoaFees > 0 && (
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">HOA Fees</span>
                    <span className="font-semibold">{formatCurrency(loanData.hoaFees)}</span>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total Monthly Payment</span>
                    <span className="text-xl font-bold text-blue-600">{formatCurrency(loanData.totalMonthlyExpense)}</span>
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
                  <span className="font-semibold text-blue-600">{loanData.interestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Loan Term</span>
                  <span className="font-semibold">{loanData.loanTerm} years</span>
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
              <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">Calculate Refinance</span>
                </div>
              </button>
              <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Make Extra Payment</span>
                </div>
              </button>
              <button className="w-full p-3 text-left bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-600" />
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
                Your property tax assessment is due for review. Consider reviewing your escrow account to ensure adequate funds for upcoming tax payments.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 