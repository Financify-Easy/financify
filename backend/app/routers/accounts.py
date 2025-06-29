from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.schemas.financial import Account, AccountCreate, AccountUpdate
from app.models.financial import Account as AccountModel
from app.routers.auth import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[Account])
def get_accounts(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all accounts for the current user."""
    accounts = db.query(AccountModel).filter(
        AccountModel.user_id == current_user.id
    ).all()
    return accounts

@router.post("/", response_model=Account)
def create_account(
    account: AccountCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new account."""
    db_account = AccountModel(
        **account.dict(),
        user_id=current_user.id
    )
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return db_account

@router.get("/{account_id}", response_model=Account)
def get_account(
    account_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific account."""
    account = db.query(AccountModel).filter(
        AccountModel.id == account_id,
        AccountModel.user_id == current_user.id
    ).first()
    
    if not account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Account not found"
        )
    
    return account

@router.put("/{account_id}", response_model=Account)
def update_account(
    account_id: int,
    account_update: AccountUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update an account."""
    account = db.query(AccountModel).filter(
        AccountModel.id == account_id,
        AccountModel.user_id == current_user.id
    ).first()
    
    if not account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Account not found"
        )
    
    for field, value in account_update.dict(exclude_unset=True).items():
        setattr(account, field, value)
    
    db.commit()
    db.refresh(account)
    return account

@router.delete("/{account_id}")
def delete_account(
    account_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete an account."""
    account = db.query(AccountModel).filter(
        AccountModel.id == account_id,
        AccountModel.user_id == current_user.id
    ).first()
    
    if not account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Account not found"
        )
    
    db.delete(account)
    db.commit()
    
    return {"message": "Account deleted successfully"} 