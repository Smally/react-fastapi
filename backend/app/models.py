from sqlalchemy import Column, Integer, String
from app.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    batch = Column(String, unique=True, index=True, nullable=False)
    stock = Column(Integer, nullable=False)
