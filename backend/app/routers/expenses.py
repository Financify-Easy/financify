from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_expenses():
    """Get all expenses."""
    return {"message": "Expenses endpoint - to be implemented"}

@router.post("/")
def create_expense():
    """Create a new expense."""
    return {"message": "Create expense endpoint - to be implemented"} 