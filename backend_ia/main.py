from fastapi import FastAPI, HTTPException, Depends, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import BaseModel
from datetime import datetime, timedelta
import hashlib

# =========================
# 🔐 CONFIG
# =========================
SECRET_KEY = "smart_hydro_secret_2026"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

app = FastAPI(title="Smart Hydro AI API")

# =========================
# 🌐 CORS (React / Node)
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# =========================
# 🟢 FAKE DB
# =========================
fake_users_db = {
    "admin": hashlib.sha256("123456".encode()).hexdigest()
}

# =========================
# 📦 MODELS
# =========================
class UserRegister(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# =========================
# 🔧 UTILS
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
# 🏠 ROOT
# =========================
@app.get("/")
def home():
    return {"message": "🌱 Smart Hydro API is running"}

# =========================
# 🌱 SENSOR DATA (FOR REACT)
# =========================
@app.get("/sensor")
def sensor():
    return {
        "humidity": 70,
        "temperature": 24,
        "soil_moisture": 38,
        "water_level": 55
    }

# =========================
# 🤖 AI ROUTE (USED BY NODE SERVER)
# =========================
@app.get("/api/recommandation/{plant}")
def recommendation(plant: str):
    return {
        "resultat": {
            "plante": plant,
            "recommandation": "Irrigate moderately",
            "besoin_eau_mm": 12,
            "unite": "mm"
        }
    }

# =========================
# 🤖 SMART AI EXTENDED
# =========================
@app.get("/ai")
def ai_prediction():
    return {
        "irrigation_needed": True,
        "confidence": 0.91,
        "message": "Water plants for 10 minutes"
    }

# =========================
# 📝 REGISTER
# =========================
@app.post("/register")
def register(user: UserRegister):
    if user.username in fake_users_db:
        raise HTTPException(status_code=400, detail="User already exists")

    fake_users_db[user.username] = hash_password(user.password)
    return {"message": "User created successfully"}

# =========================
# 🔐 LOGIN
# =========================
@app.post("/login", response_model=Token)
def login(data: dict = Body(...)):
    username = data.get("username")
    password = data.get("password")

    if username not in fake_users_db:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(password, fake_users_db[username]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token(username)

    return {
        "access_token": token,
        "token_type": "bearer"
    }

# =========================
# 🔒 PROTECTED ROUTE
# =========================
@app.get("/protected")
def protected(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user = payload.get("sub")

        return {
            "message": f"Welcome {user} 🔐 Access granted"
        }

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")