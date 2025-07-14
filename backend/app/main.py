from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import AsyncSessionLocal, init_db
from app import crud

app = FastAPI()

@app.on_event("startup")
async def startup():
    await init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dev only; tighten for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session

@app.get("/products")
async def read_products(db: AsyncSession = Depends(get_db)):
    return await crud.get_products(db)

@app.post("/products")
async def add_product(request: Request, db: AsyncSession = Depends(get_db)):
    data = await request.json()
    print(data)
    return await crud.create_product(db, data["name"], data["batch"], data["stock"])
