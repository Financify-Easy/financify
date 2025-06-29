import pytest
from fastapi import status

class TestPlaceholderEndpoints:
    """Test placeholder endpoints for unimplemented features."""
    
    def test_transactions_endpoint(self, client, auth_headers):
        """Test transactions endpoint placeholder."""
        response = client.get("/api/transactions/", headers=auth_headers)
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert "message" in data
        assert "transactions" in data["message"].lower()
    
    def test_income_endpoint(self, client, auth_headers):
        """Test income endpoint placeholder."""
        response = client.get("/api/income/", headers=auth_headers)
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert "message" in data
        assert "income" in data["message"].lower()
    
    def test_expenses_endpoint(self, client, auth_headers):
        """Test expenses endpoint placeholder."""
        response = client.get("/api/expenses/", headers=auth_headers)
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert "message" in data
        assert "expenses" in data["message"].lower()
    
    def test_loans_endpoint(self, client, auth_headers):
        """Test loans endpoint placeholder."""
        response = client.get("/api/loans/", headers=auth_headers)
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert "message" in data
        assert "loans" in data["message"].lower()
    
    def test_investments_endpoint(self, client, auth_headers):
        """Test investments endpoint placeholder."""
        response = client.get("/api/investments/", headers=auth_headers)
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert "message" in data
        assert "investments" in data["message"].lower()
    
    def test_credit_cards_endpoint(self, client, auth_headers):
        """Test credit cards endpoint placeholder."""
        response = client.get("/api/credit-cards/", headers=auth_headers)
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert "message" in data
        assert "credit cards" in data["message"].lower()
    
    def test_budgets_endpoint(self, client, auth_headers):
        """Test budgets endpoint placeholder."""
        response = client.get("/api/budgets/", headers=auth_headers)
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert "message" in data
        assert "budgets" in data["message"].lower()
    
    def test_placeholder_endpoints_unauthorized(self, client):
        """Test placeholder endpoints without authentication."""
        endpoints = [
            "/api/transactions/",
            "/api/income/",
            "/api/expenses/",
            "/api/loans/",
            "/api/investments/",
            "/api/credit-cards/",
            "/api/budgets/"
        ]
        
        for endpoint in endpoints:
            response = client.get(endpoint)
            # Placeholder endpoints don't require authentication, so they return 200
            assert response.status_code == status.HTTP_200_OK
            data = response.json()
            assert "message" in data
    
    def test_root_endpoint(self, client):
        """Test root endpoint."""
        response = client.get("/")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert "message" in data
        assert "Welcome to Financify API" in data["message"]
        assert "version" in data
        assert "docs" in data
    
    def test_health_check_endpoint(self, client):
        """Test health check endpoint."""
        response = client.get("/health")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert "status" in data
        assert data["status"] == "healthy" 