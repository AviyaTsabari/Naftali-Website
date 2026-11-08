from fastapi.testclient import TestClient

from app.data import MOCK_POEMS, MOCK_PRODUCTS
from app.main import app

client = TestClient(app)


def test_shop_has_three_categories_and_example_product() -> None:
    payload = client.get("/products").json()
    categories = {item["category"] for item in payload}

    assert categories == {"mezuzahs", "hanukkiahs", "furniture"}
    assert any(item["name"] == "דגם תמר" for item in payload)
    assert all(item["image"] is None for item in payload)
    assert all(item["currency"] is None for item in payload)
    assert len(MOCK_PRODUCTS) == 6


def test_poems_are_labeled_mock_placeholders() -> None:
    payload = client.get("/poems").json()

    assert payload
    assert len(payload) == len(MOCK_POEMS)
    for poem in payload:
        assert poem["date"]
        assert "טקסט לדוגמה" in poem["body"]
