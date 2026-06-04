from fastapi import FastAPI, HTTPException, Depends
<<<<<<< HEAD
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
=======
from fastapi.security import OAuth2PasswordBearer
>>>>>>> 88ac807141d3b9e120396c7018b0aeaf3340927e
from jose import JWTError, jwt
from pydantic import BaseModel
from datetime import datetime, timedelta
import hashlib

<<<<<<< HEAD
=======
# =====================
# CONFIG
# =====================
>>>>>>> 88ac807141d3b9e120396c7018b0aeaf3340927e
SECRET_KEY = "irrigation_secret_key_2024"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

fake_users_db = {}

<<<<<<< HEAD
app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

=======
app = FastAPI(
    title="Smart Hydro Secure API",
    version="1.0.0"
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# =====================
# MODELS
# =====================
>>>>>>> 88ac807141d3b9e120396c7018b0aeaf3340927e
class UserRegister(BaseModel):
    username: str
    password: str

<<<<<<< HEAD
=======

class UserLogin(BaseModel):
    username: str
    password: str


>>>>>>> 88ac807141d3b9e120396c7018b0aeaf3340927e
class Token(BaseModel):
    access_token: str
    token_type: str

<<<<<<< HEAD
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(password, hashed):
    return hashlib.sha256(password.encode()).hexdigest() == hashed

def create_token(username):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    data = {"sub": username, "exp": expire}
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

=======

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
>>>>>>> 88ac807141d3b9e120396c7018b0aeaf3340927e
@app.post("/register")
def register(user: UserRegister):
    if user.username in fake_users_db:
        raise HTTPException(status_code=400, detail="Username already exists")
<<<<<<< HEAD
    fake_users_db[user.username] = hash_password(user.password)
    return {"message": "User created successfully"}

@app.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username not in fake_users_db:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not verify_password(form_data.password, fake_users_db[form_data.username]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(form_data.username)
    return {"access_token": token, "token_type": "bearer"}
=======

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

>>>>>>> 88ac807141d3b9e120396c7018b0aeaf3340927e

@app.get("/protected")
def protected_route(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
<<<<<<< HEAD
        return {"message": f"Welcome {username}! Your data is protected."}
=======

        return {
            "message": f"Welcome {username}! Your data is protected 🔐"
        }

>>>>>>> 88ac807141d3b9e120396c7018b0aeaf3340927e
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")