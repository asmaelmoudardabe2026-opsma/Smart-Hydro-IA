from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from pydantic import BaseModel
from datetime import datetime, timedelta
import hashlib

SECRET_KEY = "irrigation_secret_key_2024"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# =========================
# 🟢 Fake DB
# =========================
fake_users_db = {}

# =========================
# 🟢 Models
# =========================
class UserRegister(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# =========================
# 🟢 Utils
# =========================
def hash_password(password: str):
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(password: str, hashed: str):
    return hash_password(password) == hashed

def create_token(username: str):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": username, "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# =========================
# 🟢 Default Admin (FIX مهم 🔥)
# =========================
def create_default_admin():
    username = "admin"
    password = "123456"

    if username not in fake_users_db:
        fake_users_db[username] = hash_password(password)
        print("✅ Default admin created")

@app.on_event("startup")
def startup():
    create_default_admin()

# =========================
# 🟢 Register
# =========================
@app.post("/register")
def register(user: UserRegister):
    if user.username in fake_users_db:
        raise HTTPException(status_code=400, detail="Username already exists")

    fake_users_db[user.username] = hash_password(user.password)
    return {"message": "User created successfully"}

# =========================
# 🟢 Login
# =========================
@app.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username not in fake_users_db:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    stored_password = fake_users_db[form_data.username]

    if not verify_password(form_data.password, stored_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token(form_data.username)

    return {
        "access_token": token,
        "token_type": "bearer"
    }

# =========================
# 🟢 Protected route
# =========================
@app.get("/protected")
def protected_route(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")

        return {
            "message": f"Welcome {username}! Your data is protected."
        }

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")