from sqlalchemy import select

from app.data import CATEGORIES, MOCK_POEMS, MOCK_PRODUCTS
from app.database import ProductRow, PoemRow, SessionLocal
from app.schemas import Poem, Product


def list_products(category: str | None = None) -> list[Product]:
    if category is not None and category not in CATEGORIES:
        return []

    items = _load_products()
    if category:
        return [item for item in items if item.category == category]
    return items


def get_product(product_id: str) -> Product | None:
    for item in _load_products():
        if item.id == product_id:
            return item
    return None


def list_poems() -> list[Poem]:
    return _load_poems()


def get_poem(poem_id: str) -> Poem | None:
    for item in _load_poems():
        if item.id == poem_id:
            return item
    return None


def _load_products() -> list[Product]:
    if SessionLocal is None:
        return list(MOCK_PRODUCTS)

    try:
        with SessionLocal() as session:
            rows = session.scalars(select(ProductRow)).all()
            return [Product.model_validate(row) for row in rows]
    except Exception:
        return list(MOCK_PRODUCTS)


def _load_poems() -> list[Poem]:
    if SessionLocal is None:
        return list(MOCK_POEMS)

    try:
        with SessionLocal() as session:
            rows = session.scalars(select(PoemRow)).all()
            return [Poem.model_validate(row) for row in rows]
    except Exception:
        return list(MOCK_POEMS)
