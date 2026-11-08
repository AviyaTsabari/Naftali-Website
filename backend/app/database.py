import logging
import os
from collections.abc import Generator
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine, select
from sqlalchemy.engine import Engine
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, sessionmaker

load_dotenv(Path(__file__).resolve().parents[2] / ".env")

logger = logging.getLogger(__name__)

DATABASE_URL = os.getenv("DATABASE_URL", "").strip()


class Base(DeclarativeBase):
    pass


class ProductRow(Base):
    __tablename__ = "products"

    id: Mapped[str] = mapped_column(primary_key=True)
    name: Mapped[str]
    category: Mapped[str]
    price: Mapped[float]
    currency: Mapped[str | None] = mapped_column(nullable=True)
    image: Mapped[str | None] = mapped_column(nullable=True)
    description: Mapped[str] = mapped_column(default="")
    available: Mapped[bool] = mapped_column(default=True)


class PoemRow(Base):
    __tablename__ = "poems"

    id: Mapped[str] = mapped_column(primary_key=True)
    date: Mapped[str]
    title: Mapped[str] = mapped_column(default="")
    body: Mapped[str]


_engine: Engine | None = None
SessionLocal: sessionmaker[Session] | None = None


def database_url() -> str:
    return DATABASE_URL


def get_engine() -> Engine | None:
    return _engine


def init_database() -> None:
    global _engine, SessionLocal

    if not DATABASE_URL:
        logger.info("DATABASE_URL is not set; catalog will use mock data")
        return

    try:
        _engine = create_engine(DATABASE_URL, pool_pre_ping=True)
        SessionLocal = sessionmaker(bind=_engine, expire_on_commit=False)
        Base.metadata.create_all(_engine)
        _seed()
    except Exception:
        logger.warning("PostgreSQL is unavailable; catalog will use mock data")
        _engine = None
        SessionLocal = None


def _seed() -> None:
    from app.data import MOCK_POEMS, MOCK_PRODUCTS

    if SessionLocal is None:
        return

    with SessionLocal() as session:
        if session.scalar(select(ProductRow.id).limit(1)) is None:
            session.add_all(
                [
                    ProductRow(
                        id=item.id,
                        name=item.name,
                        category=item.category,
                        price=item.price,
                        currency=item.currency,
                        image=item.image,
                        description=item.description,
                        available=item.available,
                    )
                    for item in MOCK_PRODUCTS
                ]
            )
        if session.scalar(select(PoemRow.id).limit(1)) is None:
            session.add_all(
                [
                    PoemRow(id=item.id, date=item.date, title=item.title, body=item.body)
                    for item in MOCK_POEMS
                ]
            )
        session.commit()


def session_scope() -> Generator[Session, None, None]:
    if SessionLocal is None:
        raise RuntimeError("Database is not configured")
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
