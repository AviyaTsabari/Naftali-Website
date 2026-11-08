from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router
from app.api.poems import router as poems_router
from app.api.products import router as products_router
from app.database import init_database


@asynccontextmanager
async def lifespan(_app: FastAPI):
    init_database()
    yield


app = FastAPI(title="Naftali Studio API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",
        "http://127.0.0.1:4200",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(products_router)
app.include_router(poems_router)
