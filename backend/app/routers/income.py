from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_income():
    """Get all income records."""
    return {"message": "Income endpoint - to be implemented"}

@router.post("/")
def create_income():
    """Create a new income record."""
    return {"message": "Create income endpoint - to be implemented"} 