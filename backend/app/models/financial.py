from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, Text, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum

# Enums
class TransactionType(enum.Enum):
    INCOME = "income"
    EXPENSE = "expense"
    TRANSFER = "transfer"

class ExpenseCategory(enum.Enum):
    FOOD = "food"
    TRANSPORT = "transport"
    RENTAL = "rental"
    INSURANCE = "insurance"
    UTILITIES = "utilities"
    VEHICLE = "vehicle"
    SHOPPING = "shopping"
    SUBSCRIPTION = "subscription"
    OTHER = "other"

class IncomeType(enum.Enum):
    SALARY = "salary"
    RENTAL = "rental"
    BONUS = "bonus"
    DIVIDEND = "dividend"
    INTEREST = "interest"
    OTHER = "other"

class LoanType(enum.Enum):
    HOUSING = "housing"
    VEHICLE = "vehicle"
    EDUCATION = "education"
    PERSONAL = "personal"

class InvestmentType(enum.Enum):
    STOCKS = "stocks"
    BONDS = "bonds"
    CRYPTO = "crypto"
    ETF = "etf"
    MUTUAL_FUND = "mutual_fund"
    REAL_ESTATE = "real_estate"

# User Profile
class UserProfile(Base):
    __tablename__ = "user_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    currency = Column(String, default="USD")
    timezone = Column(String, default="UTC")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    user = relationship("User", back_populates="profile")

# Accounts
class Account(Base):
    __tablename__ = "accounts"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    account_type = Column(String, nullable=False)  # savings, checking, credit, investment
    balance = Column(Float, default=0.0)
    currency = Column(String, default="USD")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    user = relationship("User", back_populates="accounts")
    transactions = relationship("Transaction", back_populates="account")

# Transactions
class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    account_id = Column(Integer, ForeignKey("accounts.id"), nullable=False)
    amount = Column(Float, nullable=False)
    description = Column(String)
    category = Column(String)
    transaction_type = Column(Enum(TransactionType), nullable=False)
    date = Column(DateTime, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="transactions")
    account = relationship("Account", back_populates="transactions")

# Income
class Income(Base):
    __tablename__ = "income"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    amount = Column(Float, nullable=False)
    income_type = Column(Enum(IncomeType), nullable=False)
    source = Column(String, nullable=False)
    date = Column(DateTime, nullable=False)
    description = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="income")

# Expenses
class Expense(Base):
    __tablename__ = "expenses"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    amount = Column(Float, nullable=False)
    category = Column(Enum(ExpenseCategory), nullable=False)
    description = Column(String)
    date = Column(DateTime, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="expenses")

# Loans
class Loan(Base):
    __tablename__ = "loans"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    loan_type = Column(Enum(LoanType), nullable=False)
    lender = Column(String, nullable=False)
    original_amount = Column(Float, nullable=False)
    current_balance = Column(Float, nullable=False)
    interest_rate = Column(Float, nullable=False)
    monthly_payment = Column(Float, nullable=False)
    loan_term = Column(Integer, nullable=False)  # in months
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    status = Column(String, default="active")  # active, paid_off, defaulted
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    user = relationship("User", back_populates="loans")
    payments = relationship("LoanPayment", back_populates="loan")

# Loan Payments
class LoanPayment(Base):
    __tablename__ = "loan_payments"
    
    id = Column(Integer, primary_key=True, index=True)
    loan_id = Column(Integer, ForeignKey("loans.id"), nullable=False)
    amount = Column(Float, nullable=False)
    payment_date = Column(DateTime, nullable=False)
    principal_amount = Column(Float, nullable=False)
    interest_amount = Column(Float, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    loan = relationship("Loan", back_populates="payments")

# Investments
class Investment(Base):
    __tablename__ = "investments"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    investment_type = Column(Enum(InvestmentType), nullable=False)
    name = Column(String, nullable=False)
    symbol = Column(String)
    quantity = Column(Float, nullable=False)
    purchase_price = Column(Float, nullable=False)
    current_price = Column(Float)
    purchase_date = Column(DateTime, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    user = relationship("User", back_populates="investments")

# Credit Cards
class CreditCard(Base):
    __tablename__ = "credit_cards"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    card_name = Column(String, nullable=False)
    card_type = Column(String, nullable=False)  # miles, cashback, rewards
    credit_limit = Column(Float, nullable=False)
    current_balance = Column(Float, default=0.0)
    available_credit = Column(Float)
    due_date = Column(DateTime)
    interest_rate = Column(Float)
    annual_fee = Column(Float, default=0.0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    user = relationship("User", back_populates="credit_cards")

# Budgets
class Budget(Base):
    __tablename__ = "budgets"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category = Column(Enum(ExpenseCategory), nullable=False)
    amount = Column(Float, nullable=False)
    period = Column(String, default="monthly")  # monthly, yearly
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="budgets")

# Update User model to include relationships
from app.models.user import User

User.profile = relationship("UserProfile", back_populates="user", uselist=False)
User.accounts = relationship("Account", back_populates="user")
User.transactions = relationship("Transaction", back_populates="user")
User.income = relationship("Income", back_populates="user")
User.expenses = relationship("Expense", back_populates="user")
User.loans = relationship("Loan", back_populates="user")
User.investments = relationship("Investment", back_populates="user")
User.credit_cards = relationship("CreditCard", back_populates="user")
User.budgets = relationship("Budget", back_populates="user") 