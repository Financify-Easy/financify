from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_transactions():
    """Get all transactions."""
    return {"message": "Transactions endpoint - to be implemented"}

@router.post("/")
def create_transaction():
    """Create a new transaction."""
    return {"message": "Create transaction endpoint - to be implemented"} 