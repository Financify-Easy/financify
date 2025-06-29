# Financify Backend

A comprehensive financial management API built with FastAPI, SQLAlchemy, and PostgreSQL.

## Features

- **User Authentication**: JWT-based authentication with secure password hashing
- **Financial Dashboard**: Overview of balances, expenses, investments, and budgets
- **Account Management**: Multiple bank accounts with balance tracking
- **Transaction Tracking**: Income and expense categorization
- **Loan Management**: Housing, vehicle, and education loans
- **Investment Portfolio**: Stocks, bonds, crypto, and other investments
- **Credit Card Management**: Multiple cards with spending tracking
- **Budget Planning**: Category-based budget management
- **RESTful API**: Complete CRUD operations for all financial entities

## Tech Stack

- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **PostgreSQL**: Primary database
- **Alembic**: Database migration tool
- **Pydantic**: Data validation using Python type annotations
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing

## Project Structure

```
backend/
├── app/
│   ├── core/
│   │   ├── config.py          # Application configuration
│   │   └── database.py        # Database connection and session
│   ├── models/
│   │   ├── user.py            # User model
│   │   └── financial.py       # All financial models
│   ├── schemas/
│   │   ├── user.py            # User Pydantic schemas
│   │   └── financial.py       # Financial Pydantic schemas
│   ├── routers/
│   │   ├── auth.py            # Authentication endpoints
│   │   ├── dashboard.py       # Dashboard endpoints
│   │   ├── accounts.py        # Account management
│   │   ├── transactions.py    # Transaction management
│   │   ├── income.py          # Income tracking
│   │   ├── expenses.py        # Expense tracking
│   │   ├── loans.py           # Loan management
│   │   ├── investments.py     # Investment tracking
│   │   ├── credit_cards.py    # Credit card management
│   │   └── budgets.py         # Budget management
│   ├── services/
│   │   └── auth.py            # Authentication service
│   └── main.py                # FastAPI application
├── alembic/                   # Database migrations
├── tests/                     # Test files
├── requirements.txt           # Python dependencies
├── env.example               # Environment variables template
└── README.md                 # This file
```

## Database Models

### Core Models
- **User**: User authentication and profile
- **UserProfile**: Extended user information
- **Account**: Bank accounts and balances

### Financial Models
- **Transaction**: All financial transactions
- **Income**: Income sources and amounts
- **Expense**: Categorized expenses
- **Loan**: Various types of loans
- **LoanPayment**: Loan payment tracking
- **Investment**: Investment portfolio
- **CreditCard**: Credit card management
- **Budget**: Budget planning and tracking

## Setup Instructions

### 1. Prerequisites

- Python 3.8+
- PostgreSQL 12+
- pip or poetry

### 2. Clone and Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Database Setup

```bash
# Create PostgreSQL database
createdb financify_db

# Copy environment file
cp env.example .env

# Edit .env with your database credentials
# DATABASE_URL=postgresql://username:password@localhost:5432/financify_db
```

### 4. Environment Variables

Create a `.env` file with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/financify_db

# Application Configuration
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS Configuration
ALLOWED_ORIGINS=["http://localhost:3000", "http://localhost:5173"]

# Environment
ENVIRONMENT=development
DEBUG=True
```

### 5. Database Migrations

```bash
# Initialize Alembic (if not already done)
alembic init alembic

# Create initial migration
alembic revision --autogenerate -m "Initial migration"

# Run migrations
alembic upgrade head
```

### 6. Run the Application

```bash
# Development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Production server
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## API Documentation

Once the server is running, you can access:

- **Interactive API Docs**: http://localhost:8000/docs
- **ReDoc Documentation**: http://localhost:8000/redoc
- **OpenAPI Schema**: http://localhost:8000/openapi.json

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/token` - Login and get access token
- `GET /api/auth/me` - Get current user info

### Dashboard
- `GET /api/dashboard/` - Get dashboard overview
- `GET /api/dashboard/stats` - Get financial statistics

### Accounts
- `GET /api/accounts/` - List all accounts
- `POST /api/accounts/` - Create new account
- `GET /api/accounts/{id}` - Get specific account
- `PUT /api/accounts/{id}` - Update account
- `DELETE /api/accounts/{id}` - Delete account

### Other Endpoints
- `/api/transactions/` - Transaction management
- `/api/income/` - Income tracking
- `/api/expenses/` - Expense tracking
- `/api/loans/` - Loan management
- `/api/investments/` - Investment tracking
- `/api/credit-cards/` - Credit card management
- `/api/budgets/` - Budget management

## Authentication

The API uses JWT tokens for authentication. To access protected endpoints:

1. Register a user: `POST /api/auth/register`
2. Login: `POST /api/auth/token`
3. Include the token in the Authorization header: `Bearer <token>`

## Development

### Running Tests

The project includes comprehensive unit and integration tests. See [tests/README.md](tests/README.md) for detailed information.

```bash
# Install test dependencies (already included in requirements.txt)
pip install -r requirements.txt

# Run all tests using the test runner script
python run_tests.py

# Or run tests directly with pytest
pytest tests/ -v

# Run specific test categories
pytest tests/ -m "unit" -v          # Unit tests only
pytest tests/ -m "integration" -v   # Integration tests only
pytest tests/ -m "not slow" -v      # Skip slow tests

# Run specific test files
pytest tests/test_auth.py -v        # Authentication tests
pytest tests/test_dashboard.py -v   # Dashboard tests
pytest tests/test_accounts.py -v    # Account tests
pytest tests/test_integration.py -v # Integration tests

# Run with coverage report
pytest tests/ --cov=app --cov-report=html

# Run tests in parallel (requires pytest-xdist)
pip install pytest-xdist
pytest tests/ -n auto
```

### Test Coverage

The test suite covers:

- ✅ **Authentication**: Registration, login, token validation, user isolation
- ✅ **Dashboard**: Data aggregation, statistics, empty user handling
- ✅ **Accounts**: Full CRUD operations, user isolation, validation
- ✅ **Integration**: Complete user workflows, error handling
- ✅ **Placeholder Endpoints**: All unimplemented endpoints
- ✅ **Error Handling**: Invalid data, unauthorized access, not found scenarios

### Test Database

Tests use an in-memory SQLite database for:
- Fast execution
- No external dependencies
- Clean state for each test
- No interference with production data

### Code Formatting

```bash
# Install formatting tools
pip install black isort

# Format code
black .
isort .
```

### Database Migrations

```bash
# Create new migration
alembic revision --autogenerate -m "Description of changes"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1
```

## Production Deployment

### Environment Variables
- Set `ENVIRONMENT=production`
- Set `DEBUG=False`
- Use strong `SECRET_KEY`
- Configure production database URL

### Security Considerations
- Use HTTPS in production
- Set appropriate CORS origins
- Use environment variables for sensitive data
- Regularly update dependencies
- Implement rate limiting
- Use proper logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run tests and linting
6. Submit a pull request

## License

This project is licensed under the MIT License. 