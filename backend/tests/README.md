# Financify Backend Tests

This directory contains comprehensive unit and integration tests for the Financify backend API.

## Test Structure

### Test Files

- **`conftest.py`** - Pytest configuration and fixtures
- **`test_auth.py`** - Authentication endpoint tests
- **`test_dashboard.py`** - Dashboard and statistics endpoint tests
- **`test_accounts.py`** - Account CRUD operation tests
- **`test_integration.py`** - End-to-end integration tests
- **`test_placeholder_endpoints.py`** - Tests for placeholder endpoints

### Test Categories

#### Unit Tests
- Individual endpoint functionality
- Input validation
- Error handling
- Authentication and authorization

#### Integration Tests
- Complete user workflows
- Multi-user isolation
- Database operations
- API flow validation

## Running Tests

### Prerequisites

1. Ensure you're in the backend directory
2. Activate your virtual environment
3. Install dependencies: `pip install -r requirements.txt`

### Running All Tests

```bash
# Using the test runner script
python run_tests.py

# Or using pytest directly
pytest tests/ -v

# Or using the module
python -m pytest tests/ -v
```

### Running Specific Tests

```bash
# Run specific test file
python run_tests.py test_auth.py

# Run specific test class
pytest tests/test_auth.py::TestAuth -v

# Run specific test method
pytest tests/test_auth.py::TestAuth::test_register_user_success -v

# Run tests with specific markers
pytest tests/ -m "integration" -v
pytest tests/ -m "not slow" -v
```

### Test Options

```bash
# Run with coverage report
pytest tests/ --cov=app --cov-report=html

# Run with detailed output
pytest tests/ -v -s

# Run and stop on first failure
pytest tests/ -x

# Run tests in parallel (requires pytest-xdist)
pytest tests/ -n auto
```

## Test Database

Tests use an in-memory SQLite database to ensure:
- Fast test execution
- No interference with production data
- Clean state for each test
- No external dependencies

## Test Fixtures

### Available Fixtures

- **`client`** - FastAPI test client with database override
- **`db_session`** - Database session for each test
- **`test_user`** - Sample user for testing
- **`test_user2`** - Second sample user for isolation tests
- **`auth_headers`** - Authentication headers for test_user
- **`auth_headers_user2`** - Authentication headers for test_user2
- **`test_account`** - Sample account
- **`test_transaction`** - Sample transaction
- **`test_expense`** - Sample expense
- **`test_income`** - Sample income
- **`test_investment`** - Sample investment
- **`test_budget`** - Sample budget

## Test Coverage

### Authentication Tests
- ✅ User registration (success and error cases)
- ✅ User login (success and error cases)
- ✅ Token validation
- ✅ User profile retrieval
- ✅ Duplicate username/email handling
- ✅ Invalid data validation

### Dashboard Tests
- ✅ Dashboard data retrieval
- ✅ Financial statistics
- ✅ Empty user handling
- ✅ Multiple accounts aggregation
- ✅ Active/inactive account filtering

### Account Tests
- ✅ Account CRUD operations
- ✅ User isolation (users can't access each other's accounts)
- ✅ Input validation
- ✅ Error handling (not found, unauthorized)
- ✅ Multiple account creation

### Integration Tests
- ✅ Complete user workflow
- ✅ Multi-user data isolation
- ✅ Error handling scenarios
- ✅ Token expiration handling

### Placeholder Endpoint Tests
- ✅ All placeholder endpoints return proper responses
- ✅ Authentication required for all endpoints
- ✅ Root and health check endpoints

## Test Data

Test data is automatically created using fixtures and includes:
- Users with hashed passwords
- Sample financial data (accounts, transactions, etc.)
- Authentication tokens
- Database sessions

## Best Practices

1. **Isolation**: Each test runs in isolation with fresh database state
2. **Fixtures**: Use fixtures for common test data and setup
3. **Assertions**: Use descriptive assertions with clear error messages
4. **Coverage**: Tests cover both success and error scenarios
5. **Performance**: Tests use in-memory database for fast execution

## Troubleshooting

### Common Issues

1. **Import Errors**: Ensure you're in the backend directory and virtual environment is activated
2. **Database Errors**: Tests use SQLite, not PostgreSQL, so no external database is needed
3. **Authentication Errors**: Check that test fixtures are properly configured
4. **Test Failures**: Check that all dependencies are installed

### Debugging

```bash
# Run with debug output
pytest tests/ -v -s --tb=long

# Run single test with debug
pytest tests/test_auth.py::TestAuth::test_register_user_success -v -s

# Check test discovery
pytest tests/ --collect-only
```

## Adding New Tests

1. Create test file following naming convention: `test_*.py`
2. Use existing fixtures when possible
3. Follow the test class structure
4. Add comprehensive assertions
5. Test both success and error cases
6. Update this README if adding new test categories 