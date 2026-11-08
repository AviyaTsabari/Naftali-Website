from fastapi.testclient import TestClient

from app.data import MOCK_POEMS, MOCK_PRODUCTS
from app.main import app

client = TestClient(app)


def test_list_products_returns_typed_mock_catalog() -> None:
    response = client.get("/products")

    assert response.status_code == 200
    payload = response.json()
    assert len(payload) == len(MOCK_PRODUCTS)
    assert payload[0]["id"] == "prod-tamar"
    assert payload[0]["name"] == "דגם תמר"
    assert payload[0]["category"] == "mezuzahs"
    assert payload[0]["currency"] is None
    assert payload[0]["image"] is None


def test_filter_products_by_category() -> None:
    response = client.get("/products", params={"category": "furniture"})

    assert response.status_code == 200
    payload = response.json()
    assert payload
    assert all(item["category"] == "furniture" for item in payload)


def test_unknown_category_is_400() -> None:
    response = client.get("/products", params={"category": "unknown"})

    assert response.status_code == 400
    assert response.json() == {"detail": "Unknown product category"}


def test_get_product_and_missing_product() -> None:
    found = client.get("/products/prod-tamar")
    missing = client.get("/products/missing")

    assert found.status_code == 200
    assert found.json()["id"] == "prod-tamar"
    assert missing.status_code == 404
    assert missing.json() == {"detail": "Product not found"}


def test_list_and_get_poems() -> None:
    listing = client.get("/poems")
    one = client.get(f"/poems/{MOCK_POEMS[0].id}")
    missing = client.get("/poems/missing")

    assert listing.status_code == 200
    assert len(listing.json()) == len(MOCK_POEMS)
    assert listing.json()[0]["date"] == MOCK_POEMS[0].date
    assert "טקסט לדוגמה" in one.json()["body"]
    assert missing.status_code == 404
    assert missing.json() == {"detail": "Poem not found"}
