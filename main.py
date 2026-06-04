from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import BaseModel
from datetime import datetime, timedelta
import hashlib

# =====================
# CONFIG
# =====================
SECRET_KEY = "irrigation_secret_key_2024"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

fake_users_db = {}

app = FastAPI(
    title="Smart Hydro Secure API",
    version="1.0.0"
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# =====================
# MODELS
# =====================
class UserRegister(BaseModel):
    username: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


# =====================
# UTILS
# =====================
def hash_password(password: str):
    return hashlib.sha256(password.encode()).hexdigest()


def verify_password(password: str, hashed: str):
    return hash_password(password) == hashed


def create_token(username: str):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": username, "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


# =====================
# ROOT (IMPORTANT to avoid 404)
# =====================
@app.get("/")
def home():
    return {
        "message": "🚀 Smart Hydro API is running",
        "docs": "/docs",
        "status": "OK"
    }


# =====================
# AUTH ROUTES
# =====================
@app.post("/register")
def register(user: UserRegister):
    if user.username in fake_users_db:
        raise HTTPException(status_code=400, detail="Username already exists")

    fake_users_db[user.username] = hash_password(user.password)

    return {"message": "User created successfully"}


@app.post("/login", response_model=Token)
def login(user: UserLogin):
    if user.username not in fake_users_db:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(user.password, fake_users_db[user.username]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token(user.username)

    return {
        "access_token": token,
        "token_type": "bearer"
    }


@app.get("/protected")
def protected_route(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")

        return {
            "message": f"Welcome {username}! Your data is protected 🔐"
        }

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")