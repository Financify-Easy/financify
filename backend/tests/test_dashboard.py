import pytest
from fastapi import status
from datetime import datetime

class TestDashboard:
    """Test dashboard endpoints."""
    
    def test_get_dashboard_data_success(self, client, auth_headers, test_user, test_account, test_transaction, test_expense, test_income, test_investment, test_budget):
        """Test successful dashboard data retrieval."""
        response = client.get("/api/dashboard/", headers=auth_headers)
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        # Check structure
        assert "stats" in data
        assert "recent_transactions" in data
        assert "budget_overview" in data
        assert "investment_allocation" in data
        
        # Check stats
        stats = data["stats"]
        assert "total_balance" in stats
        assert "monthly_expenses" in stats
        assert "investments" in stats
        assert "savings_goal" in stats
        
        # Check recent transactions
        assert isinstance(data["recent_transactions"], list)
        
        # Check budget overview
        assert isinstance(data["budget_overview"], list)
        
        # Check investment allocation
        assert isinstance(data["investment_allocation"], list)
    
    def test_get_dashboard_data_unauthorized(self, client):
        """Test dashboard data retrieval without authentication."""
        response = client.get("/api/dashboard/")
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    def test_get_dashboard_data_empty_user(self, client, auth_headers_user2):
        """Test dashboard data for user with no financial data."""
        response = client.get("/api/dashboard/", headers=auth_headers_user2)
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        # Should return zero values for empty user
        stats = data["stats"]
        assert stats["total_balance"] == 0.0
        assert stats["monthly_expenses"] == 0.0
        assert stats["investments"] == 0.0
        assert stats["savings_goal"] == 0.0
        
        assert data["recent_transactions"] == []
        assert data["budget_overview"] == []
        assert data["investment_allocation"] == []
    
    def test_get_financial_stats_success(self, client, auth_headers, test_user, test_expense, test_income):
        """Test successful financial stats retrieval."""
        response = client.get("/api/dashboard/stats", headers=auth_headers)
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        # Check structure
        assert "monthly_income" in data
        assert "monthly_expenses" in data
        assert "expense_by_category" in data
        
        # Check data types
        assert isinstance(data["monthly_income"], list)
        assert isinstance(data["monthly_expenses"], list)
        assert isinstance(data["expense_by_category"], list)
    
    def test_get_financial_stats_unauthorized(self, client):
        """Test financial stats retrieval without authentication."""
        response = client.get("/api/dashboard/stats")
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    def test_get_financial_stats_empty_user(self, client, auth_headers_user2):
        """Test financial stats for user with no data."""
        response = client.get("/api/dashboard/stats", headers=auth_headers_user2)
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        # Should return empty lists for user with no data
        assert data["monthly_income"] == []
        assert data["monthly_expenses"] == []
        assert data["expense_by_category"] == []
    
    def test_dashboard_with_multiple_accounts(self, client, auth_headers, test_user, db_session):
        """Test dashboard with multiple accounts."""
        # Create multiple accounts
        account1 = {
            "name": "Savings Account",
            "account_type": "SAVINGS",
            "balance": 1000.0,
            "currency": "USD",
            "user_id": test_user.id,
            "is_active": True
        }
        account2 = {
            "name": "Checking Account",
            "account_type": "CHECKING",
            "balance": 500.0,
            "currency": "USD",
            "user_id": test_user.id,
            "is_active": True
        }
        
        from app.models.financial import Account
        acc1 = Account(**account1)
        acc2 = Account(**account2)
        db_session.add(acc1)
        db_session.add(acc2)
        db_session.commit()
        
        response = client.get("/api/dashboard/", headers=auth_headers)
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        # Total balance should be sum of all accounts
        assert data["stats"]["total_balance"] == 1500.0
    
    def test_dashboard_with_inactive_accounts(self, client, auth_headers, test_user, db_session):
        """Test dashboard excludes inactive accounts."""
        # Create active and inactive accounts
        active_account = {
            "name": "Active Account",
            "account_type": "SAVINGS",
            "balance": 1000.0,
            "currency": "USD",
            "user_id": test_user.id,
            "is_active": True
        }
        inactive_account = {
            "name": "Inactive Account",
            "account_type": "SAVINGS",
            "balance": 500.0,
            "currency": "USD",
            "user_id": test_user.id,
            "is_active": False
        }
        
        from app.models.financial import Account
        acc1 = Account(**active_account)
        acc2 = Account(**inactive_account)
        db_session.add(acc1)
        db_session.add(acc2)
        db_session.commit()
        
        response = client.get("/api/dashboard/", headers=auth_headers)
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        # Total balance should only include active accounts
        assert data["stats"]["total_balance"] == 1000.0 