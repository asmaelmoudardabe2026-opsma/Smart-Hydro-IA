<<<<<<< HEAD
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
=======
from fastapi import FastAPI, HTTPException, Depends, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
>>>>>>> 88ac807141d3b9e120396c7018b0aeaf3340927e
from jose import JWTError, jwt
from pydantic import BaseModel
from datetime import datetime, timedelta
import hashlib

<<<<<<< HEAD
SECRET_KEY = "irrigation_secret_key_2024"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()
=======
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
>>>>>>> 88ac807141d3b9e120396c7018b0aeaf3340927e

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# =========================
<<<<<<< HEAD
# 🟢 Fake DB
# =========================
fake_users_db = {}

# =========================
# 🟢 Models
=======
# 🟢 FAKE DB
# =========================
fake_users_db = {
    "admin": hashlib.sha256("123456".encode()).hexdigest()
}

# =========================
# 📦 MODELS
>>>>>>> 88ac807141d3b9e120396c7018b0aeaf3340927e
# =========================
class UserRegister(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# =========================
<<<<<<< HEAD
# 🟢 Utils
=======
# 🔧 UTILS
>>>>>>> 88ac807141d3b9e120396c7018b0aeaf3340927e
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 88ac807141d3b9e120396c7018b0aeaf3340927e
# =========================
@app.post("/register")
def register(user: UserRegister):
    if user.username in fake_users_db:
<<<<<<< HEAD
        raise HTTPException(status_code=400, detail="Username already exists")
=======
        raise HTTPException(status_code=400, detail="User already exists")
>>>>>>> 88ac807141d3b9e120396c7018b0aeaf3340927e

    fake_users_db[user.username] = hash_password(user.password)
    return {"message": "User created successfully"}

# =========================
<<<<<<< HEAD
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
=======
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
>>>>>>> 88ac807141d3b9e120396c7018b0aeaf3340927e

    return {
        "access_token": token,
        "token_type": "bearer"
    }

# =========================
<<<<<<< HEAD
# 🟢 Protected route
# =========================
@app.get("/protected")
def protected_route(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")

        return {
            "message": f"Welcome {username}! Your data is protected."
=======
# 🔒 PROTECTED ROUTE
# =========================
@app.get("/protected")
def protected(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user = payload.get("sub")

        return {
            "message": f"Welcome {user} 🔐 Access granted"
>>>>>>> 88ac807141d3b9e120396c7018b0aeaf3340927e
        }

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")