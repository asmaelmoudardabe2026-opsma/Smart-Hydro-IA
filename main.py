from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt
from pydantic import BaseModel
from datetime import datetime, timedelta
import hashlib
import requests  # ستحتاجون مكتبة requests لطلب البيانات من موقع الطقس

# =====================
# CONFIG
# =====================
SECRET_KEY = "irrigation_secret_key_2024"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# 🔴 ضعي مفتاح OpenWeatherMap API الخاص بمشروعكم هنا 🔴
OPENWEATHER_API_KEY = "246e89b0fd8c573148eff742fb18067c"

fake_users_db = {}

app = FastAPI(
    title="Smart Hydro Secure API",
    version="1.0.0"
)

# تفعيل الـ CORS لتوصيل السيرفر بالـ React (Port 3000)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# =====================
# MODELS
# =====================
class UserRegister(BaseModel):
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
# ROOT ENDPOINT
# =====================
@app.get("/")
def home():
    return {
        "message": "🚀 Smart Hydro API is running",
        "docs": "/docs",
        "status": "OK"
    }


# =====================
# RECOMMANDATIONS API (الربط الحقيقي بـ OpenWeatherMap)
# =====================
@app.get("/api/recommendation")
def get_irrigation_recommendation(lat: float, lng: float):
    # إذا لم يتم تغيير الـ API Key بعد، نرجع كود تنبيهي
    if OPENWEATHER_API_KEY == "YOUR_OPENWEATHERMAP_API_KEY_HERE":
        raise HTTPException(
            status_code=500, 
            detail="Veuillez configurer OPENWEATHER_API_KEY dans le fichier main.py"
        )
    
    # رابط استدعاء الطقس الحالي من OpenWeatherMap باستخدام الإحداثيات المرسلة ديناميكياً
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lng}&appid={OPENWEATHER_API_KEY}&units=metric&lang=fr"
    
    try:
        response = requests.get(url)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Erreur lors de la récupération météo")
        
        weather_data = response.json()
        
        # استخراج البيانات الحية القادمة من القمر الصناعي ومحطة الأرصاد
        temperature = weather_data["main"]["temp"]
        weather_status = weather_data["weather"][0]["description"].capitalize()
        humidity = weather_data["main"]["humidity"]
        
        # 🧠 خوارزمية ذكية مخصصة لمشروعكم لحساب كمية مياه الري (Volume d'eau) بناءً على الطقس الحقيقي:
        # إذا كانت الحرارة أعلى من 30 درجة والرطوبة منخفضة، نزيد حجم المياه
        if temperature > 30:
            water_volume = 55
            advice = f"Alerte Température Élevée ({temperature}°C). Évapotranspiration intense détectée. Il est fortement recommandé d'irriguer 55 m³/hectare tôt le matin."
        elif 20 <= temperature <= 30:
            water_volume = 40
            advice = f"Climat optimal ({temperature}°C) avec {humidity}% d'humidité. Irrigation standard de 40 m³/hectare planifiée pour la fin de journée."
        else:
            water_volume = 25
            advice = f"Temps frais ({temperature}°C). Besoins hydriques réduits. Apport minimal de 25 m³/hectare suffisant."

        # إرسال النتيجة الحية النهائية لتظهر في واجهة الـ React
        return {
            "weather_status": weather_status,
            "temperature": temperature,
            "water_volume": water_volume,
            "advice": advice
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur interne : {str(e)}")


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
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username not in fake_users_db:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(form_data.password, fake_users_db[form_data.username]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token(form_data.username)
    return {
        "access_token": token,
        "token_type": "bearer"
    }