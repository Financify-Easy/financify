import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from datetime import datetime, timedelta
from typing import Generator
from passlib.context import CryptContext

from app.main import app
from app.core.database import get_db, Base
from app.models.user import User
from app.models.financial import Account, Transaction, Expense, Income, Investment, Budget
from app.services.auth import create_access_token

# Use in-memory SQLite for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Password context for hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@pytest.fixture(scope="function")
def db_session():
    """Create a fresh database session for each test."""
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def client(db_session):
    """Create a test client with database dependency override."""
    def override_get_db():
        try:
            yield db_session
        finally:
            pass
    
    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    app.dependency_overrides.clear()

@pytest.fixture
def test_user(db_session):
    """Create a test user."""
    user = User(
        username="testuser",
        email="test@example.com",
        hashed_password=pwd_context.hash("testpassword")
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user

@pytest.fixture
def test_user2(db_session):
    """Create a second test user."""
    user = User(
        username="testuser2",
        email="test2@example.com",
        hashed_password=pwd_context.hash("testpassword")
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user

@pytest.fixture
def auth_headers(test_user):
    """Create authentication headers for the test user."""
    access_token = create_access_token(data={"sub": test_user.username})
    return {"Authorization": f"Bearer {access_token}"}

@pytest.fixture
def auth_headers_user2(test_user2):
    """Create authentication headers for the second test user."""
    access_token = create_access_token(data={"sub": test_user2.username})
    return {"Authorization": f"Bearer {access_token}"}

@pytest.fixture
def test_account(db_session, test_user):
    """Create a test account."""
    account = Account(
        name="Test Bank Account",
        account_type="SAVINGS",
        balance=1000.0,
        currency="USD",
        user_id=test_user.id,
        is_active=True
    )
    db_session.add(account)
    db_session.commit()
    db_session.refresh(account)
    return account

@pytest.fixture
def test_transaction(db_session, test_user, test_account):
    """Create a test transaction."""
    transaction = Transaction(
        description="Test Transaction",
        amount=100.0,
        transaction_type="EXPENSE",
        category="FOOD",
        date=datetime.now(),
        user_id=test_user.id,
        account_id=test_account.id
    )
    db_session.add(transaction)
    db_session.commit()
    db_session.refresh(transaction)
    return transaction

@pytest.fixture
def test_expense(db_session, test_user):
    """Create a test expense."""
    expense = Expense(
        description="Test Expense",
        amount=50.0,
        category="FOOD",
        date=datetime.now(),
        user_id=test_user.id
    )
    db_session.add(expense)
    db_session.commit()
    db_session.refresh(expense)
    return expense

@pytest.fixture
def test_income(db_session, test_user):
    """Create a test income."""
    income = Income(
        description="Test Income",
        amount=2000.0,
        income_type="SALARY",
        source="Test Company",
        date=datetime.now(),
        user_id=test_user.id
    )
    db_session.add(income)
    db_session.commit()
    db_session.refresh(income)
    return income

@pytest.fixture
def test_investment(db_session, test_user):
    """Create a test investment."""
    investment = Investment(
        name="Test Stock",
        investment_type="STOCKS",
        quantity=10,
        purchase_price=50.0,
        current_price=55.0,
        purchase_date=datetime.now(),
        user_id=test_user.id
    )
    db_session.add(investment)
    db_session.commit()
    db_session.refresh(investment)
    return investment

@pytest.fixture
def test_budget(db_session, test_user):
    """Create a test budget."""
    budget = Budget(
        category="FOOD",
        amount=500.0,
        start_date=datetime.now().replace(day=1),
        end_date=datetime.now().replace(day=28),
        user_id=test_user.id
    )
    db_session.add(budget)
    db_session.commit()
    db_session.refresh(budget)
    return budget 