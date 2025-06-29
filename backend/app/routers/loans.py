from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_loans():
    """Get all loans."""
    return {"message": "Loans endpoint - to be implemented"}

@router.post("/")
def create_loan():
    """Create a new loan."""
    return {"message": "Create loan endpoint - to be implemented"} 