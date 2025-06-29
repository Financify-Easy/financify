from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
from app.routers import auth, dashboard, accounts, transactions, income, expenses, loans, investments, credit_cards, budgets

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="Financify API",
    description="A comprehensive financial management API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(accounts.router, prefix="/api/accounts", tags=["Accounts"])
app.include_router(transactions.router, prefix="/api/transactions", tags=["Transactions"])
app.include_router(income.router, prefix="/api/income", tags=["Income"])
app.include_router(expenses.router, prefix="/api/expenses", tags=["Expenses"])
app.include_router(loans.router, prefix="/api/loans", tags=["Loans"])
app.include_router(investments.router, prefix="/api/investments", tags=["Investments"])
app.include_router(credit_cards.router, prefix="/api/credit-cards", tags=["Credit Cards"])
app.include_router(budgets.router, prefix="/api/budgets", tags=["Budgets"])

@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Welcome to Financify API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"} 