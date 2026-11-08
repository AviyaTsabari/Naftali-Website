from pathlib import Path

from app.poems import load_poems_from_file
from app.schemas import Product

POEMS_FILE = Path(__file__).resolve().parent / "data" / "poems.txt"

MOCK_PRODUCTS: list[Product] = [
    Product(
        id="prod-tamar",
        name="דגם תמר",
        category="mezuzahs",
        price=100,
        currency=None,
        image=None,
        description="תיאור יוצג כאן",
        available=True,
    ),
    Product(
        id="prod-mezuzah-sample",
        name="דגם לדוגמה",
        category="mezuzahs",
        price=100,
        currency=None,
        image=None,
        description="תיאור יוצג כאן",
        available=True,
    ),
    Product(
        id="prod-hanukkiah-sample-a",
        name="דגם לדוגמה א׳",
        category="hanukkiahs",
        price=100,
        currency=None,
        image=None,
        description="תיאור יוצג כאן",
        available=True,
    ),
    Product(
        id="prod-hanukkiah-sample-b",
        name="דגם לדוגמה ב׳",
        category="hanukkiahs",
        price=100,
        currency=None,
        image=None,
        description="תיאור יוצג כאן",
        available=True,
    ),
    Product(
        id="prod-furniture-sample-a",
        name="דגם לדוגמה א׳",
        category="furniture",
        price=100,
        currency=None,
        image=None,
        description="תיאור יוצג כאן",
        available=True,
    ),
    Product(
        id="prod-furniture-sample-b",
        name="דגם לדוגמה ב׳",
        category="furniture",
        price=100,
        currency=None,
        image=None,
        description="תיאור יוצג כאן",
        available=True,
    ),
]

MOCK_POEMS = load_poems_from_file(POEMS_FILE)

CATEGORIES = ("mezuzahs", "hanukkiahs", "furniture")
