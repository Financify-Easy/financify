from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_budgets():
    """Get all budgets."""
    return {"message": "Budgets endpoint - to be implemented"}

@router.post("/")
def create_budget():
    """Create a new budget."""
    return {"message": "Create budget endpoint - to be implemented"} 