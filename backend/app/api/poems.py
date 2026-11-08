from fastapi import APIRouter, HTTPException

from app.schemas import Poem
from app.services.catalog import get_poem, list_poems

router = APIRouter(prefix="/poems", tags=["poems"])


@router.get("", response_model=list[Poem])
def read_poems() -> list[Poem]:
    return list_poems()


@router.get("/{poem_id}", response_model=Poem)
def read_poem(poem_id: str) -> Poem:
    poem = get_poem(poem_id)
    if poem is None:
        raise HTTPException(status_code=404, detail="Poem not found")
    return poem
