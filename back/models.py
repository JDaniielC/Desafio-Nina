from sqlalchemy.orm import Mapped, registry, mapped_column

table_registry = registry()

@table_registry.mapped_as_dataclass
class User:
    __tablename__ = 'users'

    id: Mapped[str] = mapped_column(init=False, primary_key=True)
    name: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(unique=True)
    phone_number: Mapped[str] = mapped_column(unique=True)
    birthdate: Mapped[str] = mapped_column()
    gender: Mapped[str] = mapped_column()
    ethnicity: Mapped[str] = mapped_column()
    updated_at: Mapped[str] = mapped_column()
    created_at: Mapped[str] = mapped_column()

@table_registry.mapped_as_dataclass
class Complaint:
    __tablename__ = 'complaints'

    id: Mapped[str] = mapped_column(init=False, primary_key=True)
    type: Mapped[str] = mapped_column()
    user_id: Mapped[str] = mapped_column()
    situation: Mapped[str] = mapped_column()
    at_moment: Mapped[bool] = mapped_column()
    neighborhood: Mapped[str] = mapped_column()
    description: Mapped[str] = mapped_column()
    date: Mapped[str] = mapped_column()
    updated_at: Mapped[str] = mapped_column()
    created_at: Mapped[str] = mapped_column()
