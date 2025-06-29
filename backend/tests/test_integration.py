import pytest
from fastapi import status

@pytest.mark.integration
class TestIntegration:
    """Integration tests for complete user flows."""
    
    @pytest.mark.slow
    def test_complete_user_flow(self, client):
        """Test complete flow: register -> login -> create accounts -> dashboard."""
        # 1. Register a new user
        user_data = {
            "username": "integrationuser",
            "email": "integration@example.com",
            "password": "testpassword123"
        }
        
        register_response = client.post("/api/auth/register", json=user_data)
        assert register_response.status_code == status.HTTP_200_OK
        user_info = register_response.json()
        
        # 2. Login to get token
        login_data = {
            "username": user_data["username"],
            "password": user_data["password"]
        }
        
        login_response = client.post("/api/auth/token", data=login_data)
        assert login_response.status_code == status.HTTP_200_OK
        token_data = login_response.json()
        access_token = token_data["access_token"]
        headers = {"Authorization": f"Bearer {access_token}"}
        
        # 3. Get current user info
        me_response = client.get("/api/auth/me", headers=headers)
        assert me_response.status_code == status.HTTP_200_OK
        me_data = me_response.json()
        assert me_data["username"] == user_data["username"]
        assert me_data["email"] == user_data["email"]
        
        # 4. Create multiple accounts
        accounts_data = [
            {
                "name": "Main Savings",
                "account_type": "SAVINGS",
                "balance": 5000.0,
                "currency": "USD",
                "is_active": True
            },
            {
                "name": "Daily Checking",
                "account_type": "CHECKING",
                "balance": 1500.0,
                "currency": "USD",
                "is_active": True
            }
        ]
        
        created_accounts = []
        for account_data in accounts_data:
            account_response = client.post("/api/accounts/", json=account_data, headers=headers)
            assert account_response.status_code == status.HTTP_200_OK
            created_accounts.append(account_response.json())
        
        # 5. Get all accounts
        accounts_response = client.get("/api/accounts/", headers=headers)
        assert accounts_response.status_code == status.HTTP_200_OK
        accounts_list = accounts_response.json()
        assert len(accounts_list) == 2
        
        # 6. Update an account
        account_id = created_accounts[0]["id"]
        update_data = {"balance": 5500.0}
        update_response = client.put(f"/api/accounts/{account_id}", json=update_data, headers=headers)
        assert update_response.status_code == status.HTTP_200_OK
        updated_account = update_response.json()
        assert updated_account["balance"] == 5500.0
        
        # 7. Get dashboard data
        dashboard_response = client.get("/api/dashboard/", headers=headers)
        assert dashboard_response.status_code == status.HTTP_200_OK
        dashboard_data = dashboard_response.json()
        
        # Verify dashboard stats
        stats = dashboard_data["stats"]
        assert stats["total_balance"] == 7000.0  # 5500 + 1500
        
        # 8. Get financial stats
        stats_response = client.get("/api/dashboard/stats", headers=headers)
        assert stats_response.status_code == status.HTTP_200_OK
        stats_data = stats_response.json()
        assert "monthly_income" in stats_data
        assert "monthly_expenses" in stats_data
        assert "expense_by_category" in stats_data
        
        # 9. Delete an account
        delete_response = client.delete(f"/api/accounts/{account_id}", headers=headers)
        assert delete_response.status_code == status.HTTP_200_OK
        
        # 10. Verify account is deleted
        get_deleted_response = client.get(f"/api/accounts/{account_id}", headers=headers)
        assert get_deleted_response.status_code == status.HTTP_404_NOT_FOUND
        
        # 11. Verify dashboard reflects the change
        dashboard_response_after = client.get("/api/dashboard/", headers=headers)
        assert dashboard_response_after.status_code == status.HTTP_200_OK
        dashboard_data_after = dashboard_response_after.json()
        assert dashboard_data_after["stats"]["total_balance"] == 1500.0  # Only remaining account
    
    @pytest.mark.slow
    def test_multiple_users_isolation(self, client):
        """Test that users cannot access each other's data."""
        # Create two users
        user1_data = {
            "username": "user1",
            "email": "user1@example.com",
            "password": "password123"
        }
        user2_data = {
            "username": "user2",
            "email": "user2@example.com",
            "password": "password123"
        }
        
        # Register both users
        client.post("/api/auth/register", json=user1_data)
        client.post("/api/auth/register", json=user2_data)
        
        # Login both users
        user1_token = client.post("/api/auth/token", data={
            "username": user1_data["username"],
            "password": user1_data["password"]
        }).json()["access_token"]
        
        user2_token = client.post("/api/auth/token", data={
            "username": user2_data["username"],
            "password": user2_data["password"]
        }).json()["access_token"]
        
        user1_headers = {"Authorization": f"Bearer {user1_token}"}
        user2_headers = {"Authorization": f"Bearer {user2_token}"}
        
        # User1 creates an account
        account_data = {
            "name": "User1 Account",
            "account_type": "SAVINGS",
            "balance": 1000.0,
            "currency": "USD",
            "is_active": True
        }
        
        account_response = client.post("/api/accounts/", json=account_data, headers=user1_headers)
        assert account_response.status_code == status.HTTP_200_OK
        account_id = account_response.json()["id"]
        
        # User2 should not see User1's account
        user2_accounts = client.get("/api/accounts/", headers=user2_headers)
        assert user2_accounts.status_code == status.HTTP_200_OK
        assert user2_accounts.json() == []
        
        # User2 should not be able to access User1's account
        user2_get_account = client.get(f"/api/accounts/{account_id}", headers=user2_headers)
        assert user2_get_account.status_code == status.HTTP_404_NOT_FOUND
        
        # User2 should not be able to update User1's account
        user2_update_account = client.put(f"/api/accounts/{account_id}", 
                                         json={"balance": 2000.0}, 
                                         headers=user2_headers)
        assert user2_update_account.status_code == status.HTTP_404_NOT_FOUND
        
        # User2 should not be able to delete User1's account
        user2_delete_account = client.delete(f"/api/accounts/{account_id}", headers=user2_headers)
        assert user2_delete_account.status_code == status.HTTP_404_NOT_FOUND
        
        # User1 should still see their account
        user1_accounts = client.get("/api/accounts/", headers=user1_headers)
        assert user1_accounts.status_code == status.HTTP_200_OK
        assert len(user1_accounts.json()) == 1
    
    def test_error_handling_flow(self, client):
        """Test error handling in various scenarios."""
        # 1. Try to access protected endpoint without token
        dashboard_response = client.get("/api/dashboard/")
        assert dashboard_response.status_code == status.HTTP_401_UNAUTHORIZED
        
        # 2. Try to register with invalid data
        invalid_user_data = {
            "username": "",  # Empty username
            "email": "invalid-email",  # Invalid email
            "password": "123"  # Too short password
        }
        
        register_response = client.post("/api/auth/register", json=invalid_user_data)
        assert register_response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
        
        # 3. Try to login with non-existent user
        login_response = client.post("/api/auth/token", data={
            "username": "nonexistent",
            "password": "password"
        })
        assert login_response.status_code == status.HTTP_401_UNAUTHORIZED
        
        # 4. Register a user and try to register again with same username
        user_data = {
            "username": "duplicateuser",
            "email": "duplicate@example.com",
            "password": "password123"
        }
        
        client.post("/api/auth/register", json=user_data)
        
        duplicate_response = client.post("/api/auth/register", json=user_data)
        assert duplicate_response.status_code == status.HTTP_400_BAD_REQUEST
        assert "Username already registered" in duplicate_response.json()["detail"]
        
        # 5. Try to create account with invalid data
        login_token = client.post("/api/auth/token", data={
            "username": user_data["username"],
            "password": user_data["password"]
        }).json()["access_token"]
        
        headers = {"Authorization": f"Bearer {login_token}"}
        
        invalid_account_data = {
            "name": "",  # Empty name
            "account_type": "INVALID_TYPE",  # Invalid type
            "balance": -100  # Negative balance
        }
        
        account_response = client.post("/api/accounts/", json=invalid_account_data, headers=headers)
        assert account_response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
        
        # 6. Try to access non-existent account
        non_existent_response = client.get("/api/accounts/999", headers=headers)
        assert non_existent_response.status_code == status.HTTP_404_NOT_FOUND
    
    def test_token_expiration_handling(self, client):
        """Test handling of expired tokens."""
        # Register and login user
        user_data = {
            "username": "tokenuser",
            "email": "token@example.com",
            "password": "password123"
        }
        
        client.post("/api/auth/register", json=user_data)
        
        # Note: In a real scenario, you would need to mock time or use a very short expiration
        # For this test, we'll use an invalid token
        invalid_headers = {"Authorization": "Bearer invalid_token_here"}
        
        # Try to access protected endpoints with invalid token
        me_response = client.get("/api/auth/me", headers=invalid_headers)
        assert me_response.status_code == status.HTTP_401_UNAUTHORIZED
        
        dashboard_response = client.get("/api/dashboard/", headers=invalid_headers)
        assert dashboard_response.status_code == status.HTTP_401_UNAUTHORIZED
        
        accounts_response = client.get("/api/accounts/", headers=invalid_headers)
        assert accounts_response.status_code == status.HTTP_401_UNAUTHORIZED 