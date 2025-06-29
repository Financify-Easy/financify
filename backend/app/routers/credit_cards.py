from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_credit_cards():
    """Get all credit cards."""
    return {"message": "Credit cards endpoint - to be implemented"}

@router.post("/")
def create_credit_card():
    """Create a new credit card."""
    return {"message": "Create credit card endpoint - to be implemented"} 