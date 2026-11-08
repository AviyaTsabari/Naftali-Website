from fastapi import APIRouter, HTTPException, Query

from app.data import CATEGORIES
from app.schemas import Product
from app.services.catalog import get_product, list_products

router = APIRouter(prefix="/products", tags=["products"])


@router.get("", response_model=list[Product])
def read_products(category: str | None = Query(default=None)) -> list[Product]:
    if category is not None and category not in CATEGORIES:
        raise HTTPException(status_code=400, detail="Unknown product category")
    return list_products(category)


@router.get("/{product_id}", response_model=Product)
def read_product(product_id: str) -> Product:
    product = get_product(product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
