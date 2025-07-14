from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models import Product

async def get_products(db: AsyncSession):
    result = await db.execute(select(Product))
    return result.scalars().all()

async def create_product(db: AsyncSession, name: str, batch:str, stock: int):
    product = Product(name=name, batch=batch, stock=stock)
    db.add(product)
    await db.commit()
    await db.refresh(product)
    return product
