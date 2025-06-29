from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_investments():
    """Get all investments."""
    return {"message": "Investments endpoint - to be implemented"}

@router.post("/")
def create_investment():
    """Create a new investment."""
    return {"message": "Create investment endpoint - to be implemented"} 