from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

ProductCategory = Literal["mezuzahs", "hanukkiahs", "furniture"]


class Product(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    category: ProductCategory
    price: float
    currency: str | None = None
    image: str | None = None
    description: str = ""
    available: bool = True


class Poem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    date: str = Field(description="Displayed as the poem card title")
    title: str = ""
    body: str


class ErrorBody(BaseModel):
    detail: str
