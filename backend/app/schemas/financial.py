from pydantic import BaseModel, Field, validator
from typing import Optional, List
from datetime import datetime
from enum import Enum

# Enums
class TransactionType(str, Enum):
    INCOME = "income"
    EXPENSE = "expense"
    TRANSFER = "transfer"

class ExpenseCategory(str, Enum):
    FOOD = "food"
    TRANSPORT = "transport"
    RENTAL = "rental"
    INSURANCE = "insurance"
    UTILITIES = "utilities"
    VEHICLE = "vehicle"
    SHOPPING = "shopping"
    SUBSCRIPTION = "subscription"
    OTHER = "other"

class IncomeType(str, Enum):
    SALARY = "salary"
    RENTAL = "rental"
    BONUS = "bonus"
    DIVIDEND = "dividend"
    INTEREST = "interest"
    OTHER = "other"

class LoanType(str, Enum):
    HOUSING = "housing"
    VEHICLE = "vehicle"
    EDUCATION = "education"
    PERSONAL = "personal"

class InvestmentType(str, Enum):
    STOCKS = "stocks"
    BONDS = "bonds"
    CRYPTO = "crypto"
    ETF = "etf"
    MUTUAL_FUND = "mutual_fund"
    REAL_ESTATE = "real_estate"

class AccountType(str, Enum):
    SAVINGS = "SAVINGS"
    CHECKING = "CHECKING"
    INVESTMENT = "INVESTMENT"
    CREDIT = "CREDIT"

# Account Schemas
class AccountBase(BaseModel):
    name: str = Field(..., min_length=1, description="Account name cannot be empty")
    account_type: AccountType
    balance: float = Field(..., ge=0, description="Balance cannot be negative")
    currency: str = Field(default="USD", min_length=3, max_length=3)

    @validator('name')
    def validate_name(cls, v):
        if not v.strip():
            raise ValueError('Account name cannot be empty')
        return v.strip()

class AccountCreate(AccountBase):
    pass

class AccountUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1)
    balance: Optional[float] = Field(None, ge=0)
    is_active: Optional[bool] = None

    @validator('name')
    def validate_name(cls, v):
        if v is not None and not v.strip():
            raise ValueError('Account name cannot be empty')
        return v.strip() if v is not None else v

class Account(AccountBase):
    id: int
    user_id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Transaction Schemas
class TransactionBase(BaseModel):
    amount: float
    description: Optional[str] = None
    category: Optional[str] = None
    transaction_type: TransactionType
    date: datetime

class TransactionCreate(TransactionBase):
    account_id: int

class TransactionUpdate(BaseModel):
    amount: Optional[float] = None
    description: Optional[str] = None
    category: Optional[str] = None
    date: Optional[datetime] = None

class Transaction(TransactionBase):
    id: int
    user_id: int
    account_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Income Schemas
class IncomeBase(BaseModel):
    amount: float
    income_type: IncomeType
    source: str
    date: datetime
    description: Optional[str] = None

class IncomeCreate(IncomeBase):
    pass

class IncomeUpdate(BaseModel):
    amount: Optional[float] = None
    income_type: Optional[IncomeType] = None
    source: Optional[str] = None
    date: Optional[datetime] = None
    description: Optional[str] = None

class Income(IncomeBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Expense Schemas
class ExpenseBase(BaseModel):
    amount: float
    category: ExpenseCategory
    description: Optional[str] = None
    date: datetime

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseUpdate(BaseModel):
    amount: Optional[float] = None
    category: Optional[ExpenseCategory] = None
    description: Optional[str] = None
    date: Optional[datetime] = None

class Expense(ExpenseBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Loan Schemas
class LoanBase(BaseModel):
    loan_type: LoanType
    lender: str
    original_amount: float
    current_balance: float
    interest_rate: float
    monthly_payment: float
    loan_term: int
    start_date: datetime
    end_date: datetime
    status: str = "active"

class LoanCreate(LoanBase):
    pass

class LoanUpdate(BaseModel):
    current_balance: Optional[float] = None
    monthly_payment: Optional[float] = None
    status: Optional[str] = None

class Loan(LoanBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Loan Payment Schemas
class LoanPaymentBase(BaseModel):
    amount: float
    payment_date: datetime
    principal_amount: float
    interest_amount: float

class LoanPaymentCreate(LoanPaymentBase):
    loan_id: int

class LoanPayment(LoanPaymentBase):
    id: int
    loan_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Investment Schemas
class InvestmentBase(BaseModel):
    investment_type: InvestmentType
    name: str
    symbol: Optional[str] = None
    quantity: float
    purchase_price: float
    current_price: Optional[float] = None
    purchase_date: datetime

class InvestmentCreate(InvestmentBase):
    pass

class InvestmentUpdate(BaseModel):
    current_price: Optional[float] = None
    quantity: Optional[float] = None

class Investment(InvestmentBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Credit Card Schemas
class CreditCardBase(BaseModel):
    card_name: str
    card_type: str
    credit_limit: float
    current_balance: float = 0.0
    available_credit: Optional[float] = None
    due_date: Optional[datetime] = None
    interest_rate: Optional[float] = None
    annual_fee: float = 0.0
    is_active: bool = True

class CreditCardCreate(CreditCardBase):
    pass

class CreditCardUpdate(BaseModel):
    current_balance: Optional[float] = None
    available_credit: Optional[float] = None
    due_date: Optional[datetime] = None
    is_active: Optional[bool] = None

class CreditCard(CreditCardBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Budget Schemas
class BudgetBase(BaseModel):
    category: ExpenseCategory
    amount: float
    period: str = "monthly"
    start_date: datetime
    end_date: datetime

class BudgetCreate(BudgetBase):
    pass

class BudgetUpdate(BaseModel):
    amount: Optional[float] = None
    end_date: Optional[datetime] = None

class Budget(BudgetBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Dashboard Response Schemas
class DashboardStats(BaseModel):
    total_balance: float
    monthly_expenses: float
    investments: float
    savings_goal: float

class RecentTransaction(BaseModel):
    name: str
    amount: float
    type: str
    time: str

class DashboardResponse(BaseModel):
    stats: DashboardStats
    recent_transactions: List[RecentTransaction]
    budget_overview: List[dict]
    investment_allocation: List[dict] 