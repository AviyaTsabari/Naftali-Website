from pathlib import Path

from fastapi.testclient import TestClient

from app.data import MOCK_POEMS, MOCK_PRODUCTS
from app.database import SessionLocal, database_url
from app.main import app
from app.services.catalog import list_poems, list_products

client = TestClient(app)

PRODUCT_FIELDS = {
    "id",
    "name",
    "category",
    "price",
    "currency",
    "image",
    "description",
    "available",
}
POEM_FIELDS = {"id", "date", "title", "body"}
DATABASE_SOURCE = Path(__file__).resolve().parents[1] / "app" / "database.py"


def test_product_and_poem_contracts_include_required_fields() -> None:
    product = client.get("/products").json()[0]
    poem = client.get("/poems").json()[0]

    assert PRODUCT_FIELDS <= set(product)
    assert POEM_FIELDS <= set(poem)
    assert product["available"] is True
    assert product["currency"] is None
    assert poem["title"]
    assert poem["body"]


def test_catalog_service_matches_mock_data_without_postgres() -> None:
    if SessionLocal is not None:
        return

    assert list_products() == MOCK_PRODUCTS
    assert list_poems() == MOCK_POEMS
    assert database_url() == "" or isinstance(database_url(), str)


def test_database_module_reads_url_from_environment() -> None:
    source = DATABASE_SOURCE.read_text(encoding="utf-8")

    assert 'os.getenv("DATABASE_URL"' in source
    assert "postgresql+psycopg://" not in source
    assert "postgresql://" not in source
