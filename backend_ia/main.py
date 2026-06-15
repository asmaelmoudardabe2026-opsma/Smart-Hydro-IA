import uvicorn
from fastapi import FastAPI, HTTPException, status, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

app = FastAPI(
    title="Smart Hydro IA API",
    description="Backend finalisé pour l'authentification et la gestion des données",
    version="1.2.0"
)

# Configuration CORS pour connecter React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modèles Pydantic
class UserRegister(BaseModel):
    prenom: str
    nom: str
    email: EmailStr
    gps: str
    culture_type: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Base de données temporaire en mémoire
fake_users_db = []

# 1. Route d'inscription
@app.post("/register", status_code=status.HTTP_201_CREATED)
def register(user_data: UserRegister):
    for user in fake_users_db:
        if user["email"] == user_data.email:
            raise HTTPException(status_code=400, detail="Cet e-mail est déjà utilisé.")
    
    new_user = user_data.model_dump() 
    fake_users_db.append(new_user)
    print(f"🎉 Utilisateur créé en mémoire : {user_data.email}")
    return {"message": "Utilisateur enregistré avec succès !"}

# 2. Route de connexion
@app.post("/login")
def login(login_data: UserLogin):
    print(f"🔍 Tentative de connexion pour : {login_data.email}")
    
    for user in fake_users_db:
        if user["email"] == login_data.email:
            if user["password"] == login_data.password:
                print(f"🔑 Connexion validée pour : {login_data.email}")
                return {
                    "message": "Connexion réussie !",
                    "user": {"email": user["email"], "prenom": user["prenom"], "nom": user["nom"]}
                }
            else:
                raise HTTPException(status_code=400, detail="Mot de passe incorrect.")
                
    raise HTTPException(status_code=404, detail="Utilisateur non trouvé. Veuillez vous inscrire.")

# 3. Route pour enregistrer la localisation (La route que tu voulais)
@app.post("/save-location")
def save_location(data: dict = Body(...)):
    lat = data.get("lat")
    lng = data.get("lng")
    print(f"📍 تم استقبال الموقع: Latitude={lat}, Longitude={lng}")
    return {"message": "تم استلام الموقع بنجاح!", "location": data}

@app.get("/")
def read_root():
    return {"status": "Le serveur est en ligne sur le port 5000 !"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=5000, reload=True)