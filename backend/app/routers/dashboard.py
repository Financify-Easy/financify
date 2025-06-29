from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, text
from datetime import datetime, timedelta
from typing import List
from app.core.database import get_db
from app.schemas.financial import DashboardResponse, DashboardStats, RecentTransaction
from app.models.financial import Transaction, Account, Expense, Income, Investment, Budget
from app.routers.auth import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=DashboardResponse)
def get_dashboard_data(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get dashboard overview data."""
    
    # Calculate total balance from all accounts
    total_balance = db.query(func.sum(Account.balance)).filter(
        Account.user_id == current_user.id,
        Account.is_active == True
    ).scalar() or 0.0
    
    # Calculate monthly expenses
    start_of_month = datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    monthly_expenses = db.query(func.sum(Expense.amount)).filter(
        Expense.user_id == current_user.id,
        Expense.date >= start_of_month
    ).scalar() or 0.0
    
    # Calculate total investments
    total_investments = db.query(func.sum(
        Investment.quantity * func.coalesce(Investment.current_price, Investment.purchase_price)
    )).filter(
        Investment.user_id == current_user.id
    ).scalar() or 0.0
    
    # Calculate savings goal (example: 20% of monthly income)
    monthly_income = db.query(func.sum(Income.amount)).filter(
        Income.user_id == current_user.id,
        Income.date >= start_of_month
    ).scalar() or 0.0
    
    savings_goal = (monthly_income * 0.2) if monthly_income > 0 else 0.0
    
    # Get recent transactions
    recent_transactions = db.query(Transaction).filter(
        Transaction.user_id == current_user.id
    ).order_by(Transaction.date.desc()).limit(5).all()
    
    recent_transactions_data = []
    for trans in recent_transactions:
        recent_transactions_data.append(RecentTransaction(
            name=trans.description or "Transaction",
            amount=trans.amount,
            type=trans.transaction_type.value,
            time=f"{trans.date.strftime('%Y-%m-%d %H:%M')}"
        ))
    
    # Get budget overview
    budgets = db.query(Budget).filter(
        Budget.user_id == current_user.id,
        Budget.start_date <= datetime.now(),
        Budget.end_date >= datetime.now()
    ).all()
    
    budget_overview = []
    for budget in budgets:
        spent = db.query(func.sum(Expense.amount)).filter(
            Expense.user_id == current_user.id,
            Expense.category == budget.category,
            Expense.date >= budget.start_date,
            Expense.date <= budget.end_date
        ).scalar() or 0.0
        
        budget_overview.append({
            "category": budget.category.value,
            "spent": spent,
            "budget": budget.amount,
            "percentage": (spent / budget.amount * 100) if budget.amount > 0 else 0
        })
    
    # Get investment allocation
    investments = db.query(Investment).filter(
        Investment.user_id == current_user.id
    ).all()
    
    investment_allocation = []
    for inv in investments:
        current_value = inv.quantity * (inv.current_price or inv.purchase_price)
        investment_allocation.append({
            "type": inv.investment_type.value,
            "amount": current_value,
            "percentage": 0  # Will be calculated based on total
        })
    
    # Calculate percentages for investment allocation
    total_inv_value = sum(item["amount"] for item in investment_allocation)
    if total_inv_value > 0:
        for item in investment_allocation:
            item["percentage"] = (item["amount"] / total_inv_value) * 100
    
    stats = DashboardStats(
        total_balance=total_balance,
        monthly_expenses=monthly_expenses,
        investments=total_investments,
        savings_goal=savings_goal
    )
    
    return DashboardResponse(
        stats=stats,
        recent_transactions=recent_transactions_data,
        budget_overview=budget_overview,
        investment_allocation=investment_allocation
    )

@router.get("/stats")
def get_financial_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get detailed financial statistics."""
    
    # Monthly income trend - using SQLite date functions
    monthly_income = db.query(
        func.strftime('%Y-%m', Income.date).label('month'),
        func.sum(Income.amount).label('total')
    ).filter(
        Income.user_id == current_user.id
    ).group_by(
        func.strftime('%Y-%m', Income.date)
    ).order_by(
        func.strftime('%Y-%m', Income.date).desc()
    ).limit(6).all()
    
    # Monthly expense trend - using SQLite date functions
    monthly_expenses = db.query(
        func.strftime('%Y-%m', Expense.date).label('month'),
        func.sum(Expense.amount).label('total')
    ).filter(
        Expense.user_id == current_user.id
    ).group_by(
        func.strftime('%Y-%m', Expense.date)
    ).order_by(
        func.strftime('%Y-%m', Expense.date).desc()
    ).limit(6).all()
    
    # Expense by category
    expense_by_category = db.query(
        Expense.category,
        func.sum(Expense.amount).label('total')
    ).filter(
        Expense.user_id == current_user.id,
        Expense.date >= datetime.now() - timedelta(days=30)
    ).group_by(Expense.category).all()
    
    return {
        "monthly_income": [
            {"month": str(item.month), "total": float(item.total)}
            for item in monthly_income
        ],
        "monthly_expenses": [
            {"month": str(item.month), "total": float(item.total)}
            for item in monthly_expenses
        ],
        "expense_by_category": [
            {"category": item.category.value, "total": float(item.total)}
            for item in expense_by_category
        ]
    } 