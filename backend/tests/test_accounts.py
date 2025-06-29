import pytest
from fastapi import status

class TestAccounts:
    """Test accounts endpoints."""
    
    def test_get_accounts_success(self, client, auth_headers, test_account):
        """Test successful retrieval of user accounts."""
        response = client.get("/api/accounts/", headers=auth_headers)
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        assert isinstance(data, list)
        assert len(data) == 1
        assert data[0]["name"] == test_account.name
        assert data[0]["balance"] == test_account.balance
        assert data[0]["account_type"] == test_account.account_type
    
    def test_get_accounts_unauthorized(self, client):
        """Test accounts retrieval without authentication."""
        response = client.get("/api/accounts/")
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    def test_get_accounts_empty(self, client, auth_headers_user2):
        """Test accounts retrieval for user with no accounts."""
        response = client.get("/api/accounts/", headers=auth_headers_user2)
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data == []
    
    def test_create_account_success(self, client, auth_headers, test_user):
        """Test successful account creation."""
        account_data = {
            "name": "New Savings Account",
            "account_type": "SAVINGS",
            "balance": 2500.0,
            "currency": "USD",
            "is_active": True
        }
        
        response = client.post("/api/accounts/", json=account_data, headers=auth_headers)
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        assert data["name"] == account_data["name"]
        assert data["balance"] == account_data["balance"]
        assert data["account_type"] == account_data["account_type"]
        assert data["currency"] == account_data["currency"]
        assert data["is_active"] == account_data["is_active"]
        assert "id" in data
        assert data["user_id"] == test_user.id
    
    def test_create_account_unauthorized(self, client):
        """Test account creation without authentication."""
        account_data = {
            "name": "New Account",
            "account_type": "SAVINGS",
            "balance": 1000.0,
            "currency": "USD"
        }
        
        response = client.post("/api/accounts/", json=account_data)
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    def test_create_account_invalid_data(self, client, auth_headers):
        """Test account creation with invalid data."""
        account_data = {
            "name": "",  # Empty name
            "account_type": "INVALID_TYPE",  # Invalid account type
            "balance": -100  # Negative balance
        }
        
        response = client.post("/api/accounts/", json=account_data, headers=auth_headers)
        
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    
    def test_get_account_success(self, client, auth_headers, test_account):
        """Test successful retrieval of specific account."""
        response = client.get(f"/api/accounts/{test_account.id}", headers=auth_headers)
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        assert data["id"] == test_account.id
        assert data["name"] == test_account.name
        assert data["balance"] == test_account.balance
        assert data["account_type"] == test_account.account_type
    
    def test_get_account_not_found(self, client, auth_headers):
        """Test retrieval of non-existent account."""
        response = client.get("/api/accounts/999", headers=auth_headers)
        
        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert "Account not found" in response.json()["detail"]
    
    def test_get_account_unauthorized(self, client, test_account):
        """Test account retrieval without authentication."""
        response = client.get(f"/api/accounts/{test_account.id}")
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    def test_get_account_wrong_user(self, client, auth_headers_user2, test_account):
        """Test retrieval of account belonging to different user."""
        response = client.get(f"/api/accounts/{test_account.id}", headers=auth_headers_user2)
        
        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert "Account not found" in response.json()["detail"]
    
    def test_update_account_success(self, client, auth_headers, test_account):
        """Test successful account update."""
        update_data = {
            "name": "Updated Account Name",
            "balance": 1500.0
        }
        
        response = client.put(f"/api/accounts/{test_account.id}", json=update_data, headers=auth_headers)
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        assert data["name"] == update_data["name"]
        assert data["balance"] == update_data["balance"]
        assert data["id"] == test_account.id
        # Other fields should remain unchanged
        assert data["account_type"] == test_account.account_type
        assert data["currency"] == test_account.currency
    
    def test_update_account_not_found(self, client, auth_headers):
        """Test update of non-existent account."""
        update_data = {
            "name": "Updated Name",
            "balance": 1000.0
        }
        
        response = client.put("/api/accounts/999", json=update_data, headers=auth_headers)
        
        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert "Account not found" in response.json()["detail"]
    
    def test_update_account_unauthorized(self, client, test_account):
        """Test account update without authentication."""
        update_data = {
            "name": "Updated Name",
            "balance": 1000.0
        }
        
        response = client.put(f"/api/accounts/{test_account.id}", json=update_data)
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    def test_update_account_wrong_user(self, client, auth_headers_user2, test_account):
        """Test update of account belonging to different user."""
        update_data = {
            "name": "Updated Name",
            "balance": 1000.0
        }
        
        response = client.put(f"/api/accounts/{test_account.id}", json=update_data, headers=auth_headers_user2)
        
        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert "Account not found" in response.json()["detail"]
    
    def test_delete_account_success(self, client, auth_headers, test_account):
        """Test successful account deletion."""
        response = client.delete(f"/api/accounts/{test_account.id}", headers=auth_headers)
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["message"] == "Account deleted successfully"
        
        # Verify account is actually deleted
        get_response = client.get(f"/api/accounts/{test_account.id}", headers=auth_headers)
        assert get_response.status_code == status.HTTP_404_NOT_FOUND
    
    def test_delete_account_not_found(self, client, auth_headers):
        """Test deletion of non-existent account."""
        response = client.delete("/api/accounts/999", headers=auth_headers)
        
        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert "Account not found" in response.json()["detail"]
    
    def test_delete_account_unauthorized(self, client, test_account):
        """Test account deletion without authentication."""
        response = client.delete(f"/api/accounts/{test_account.id}")
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    def test_delete_account_wrong_user(self, client, auth_headers_user2, test_account):
        """Test deletion of account belonging to different user."""
        response = client.delete(f"/api/accounts/{test_account.id}", headers=auth_headers_user2)
        
        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert "Account not found" in response.json()["detail"]
    
    def test_create_multiple_accounts(self, client, auth_headers, test_user):
        """Test creating multiple accounts for the same user."""
        accounts_data = [
            {
                "name": "Savings Account",
                "account_type": "SAVINGS",
                "balance": 1000.0,
                "currency": "USD",
                "is_active": True
            },
            {
                "name": "Checking Account",
                "account_type": "CHECKING",
                "balance": 500.0,
                "currency": "USD",
                "is_active": True
            },
            {
                "name": "Investment Account",
                "account_type": "INVESTMENT",
                "balance": 5000.0,
                "currency": "USD",
                "is_active": True
            }
        ]
        
        created_accounts = []
        for account_data in accounts_data:
            response = client.post("/api/accounts/", json=account_data, headers=auth_headers)
            assert response.status_code == status.HTTP_200_OK
            created_accounts.append(response.json())
        
        # Verify all accounts are created
        response = client.get("/api/accounts/", headers=auth_headers)
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert len(data) == 3
        
        # Verify account types
        account_types = [acc["account_type"] for acc in data]
        assert "SAVINGS" in account_types
        assert "CHECKING" in account_types
        assert "INVESTMENT" in account_types 