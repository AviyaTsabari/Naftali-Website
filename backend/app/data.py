from app.schemas import Poem, Product

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

MOCK_POEMS: list[Poem] = [
    Poem(
        id="poem-2024-03-12",
        date="2024-03-12",
        title="",
        body="טקסט לדוגמה בלבד. השיר המלא יפורסם כאן.",
    ),
    Poem(
        id="poem-2024-07-01",
        date="2024-07-01",
        title="",
        body="טקסט לדוגמה בלבד. השיר המלא יפורסם כאן.",
    ),
    Poem(
        id="poem-2025-01-20",
        date="2025-01-20",
        title="",
        body="טקסט לדוגמה בלבד. השיר המלא יפורסם כאן.",
    ),
]

CATEGORIES = ("mezuzahs", "hanukkiahs", "furniture")
