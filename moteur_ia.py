from fastapi import FastAPI, HTTPException, Depends, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
import uvicorn
import time

# ==========================================
# 1. CONFIGURATION SÉCURITÉ & TOKENS JWT
# ==========================================

SECRET_KEY = "SUPER_SECRET_SMART_HYDRO_KEY_UPM"  # Clé de signature sécurisée
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 120  # Durée du token (2 heures)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# --- BASE DE DONNÉES SIMULÉE (Identifiants de test pour le PFE) ---
users_db = {
    "admin": {
        "username": "admin",
        "full_name": "Asma - Responsable Backend",
        "email": "asma@upm.ac.ma",
        "hashed_password": pwd_context.hash("admin123"), # Mot de passe crypté proprement
        "disabled": False,
    }
}

# --- FONCTIONS UTILITAIRES SÉCURITÉ ---
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    La barrière de sécurité : extrait le Token, vérifie sa validité,
    et injecte l'utilisateur actuellement connecté.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Accès refusé : Vous devez avoir une autorisation système (Token valide).",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = users_db.get(username)
    if user is None:
        raise credentials_exception
    return user


# ==========================================
# 2. INITIALISATION DE L'APPLICATION
# ==========================================

app = FastAPI(
    title="Smart-Hydro Backend API",
    description="API de calcul des besoins en irrigation avec IA et Sécurité Intégrée (JWT & Surveillance)",
    version="1.2.0"
)


# ==========================================
# 3. MIDDLEWARE DE SURVEILLANCE ET INTÉGRITÉ
# ==========================================

@app.middleware("http")
async def monitor_integrity_middleware(request: Request, call_next):
    # Detection d'anomalies simples (mots-clés suspects dans l'URL)
    suspicious_keywords = ["drop", "delete", "script", "select"]
    path = request.url.path.lower()
    
    for keyword in suspicious_keywords:
        if keyword in path and not path.startswith("/token"):
            print(f"ALERTE SÉCURITÉ : Tentative d'accès suspecte détectée sur {path}")
            return JSONResponse(
                status_code=403,
                content={"detail": "ALERTE : Action suspecte bloquée pour protéger les cultures."}
            )

    # Mesure du temps de réponse (Performance monitoring)
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    
    if process_time > 2.0:
        print(f"ALERTE PERFORMANCE : Requête lente détectée ({process_time:.2f}s)")
        
    return response


# ==========================================
# 4. CONFIGURATION CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# 5. SAVOIR MÉTIER (DATA CULTURES MAROC)
# ==========================================

CULTURES_MAROC = {
    "olivier": {"kc": 0.70, "nom": "Olivier"},
    "agrumes": {"kc": 0.85, "nom": "Agrumes (Orange/Citron)"},
    "maraichage": {"kc": 1.15, "nom": "Culture Maraîchère"}
}


# ==========================================
# 6. ENDPOINTS / ROUTES DE L'API
# ==========================================

# Route principale publique
@app.get("/")
def home():
    return {
        "projet": "Smart-Hydro",
        "auteur": "Asma",
        "statut": "Sécurisé et Opérationnel",
        "docs": "/docs"
    }

# Route pour obtenir le jeton JWT (Login)
@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Formulaire d'authentification officiel. Utilise 'admin' et 'admin123'.
    """
    user = users_db.get(form_data.username)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Nom d'utilisateur ou mot de passe incorrect",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Route de calcul IA - PROTÉGÉE SÉCURISÉE
@app.get("/api/recommandation/{plante}")
def obtenir_recommandation(
    plante: str, 
    ville: str = "Marrakech", 
    current_user: dict = Depends(get_current_user)
):
    """
    Calcule le besoin en eau précis selon la formule : Besoin = ETo x Kc.
    """
    plante_key = plante.lower()
    
    if plante_key not in CULTURES_MAROC:
        raise HTTPException(
            status_code=404, 
            detail=f"La culture '{plante}' n'est pas répertoriée."
        )
    
    eto_du_jour = 6.2  # Simulation de l'ETo moyenne à Marrakech
    kc = CULTURES_MAROC[plante_key]["kc"]
    besoin_mm = round(eto_du_jour * kc, 2)
    
    return {
        "utilisateur_connecte": current_user["full_name"],
        "info_calcul": {
            "ville": ville,
            "eto_reference_mm": eto_du_jour,
            "coefficient_kc": kc
        },
        "resultat": {
            "plante": CULTURES_MAROC[plante_key]["nom"],
            "besoin_eau_mm": besoin_mm,
            "unite": "millimètres par jour",
            "recommandation": f"Bonjour {current_user['full_name']}, optimisez l'irrigation pour économiser 30% d'eau."
        }
    }

# Route de contrôle des vannes d'irrigation - PROTÉGÉE ET SURVEILLÉE
@app.post("/api/irrigation/controler")
async def controler_irrigation(
    action: str, 
    duree_minutes: int,
    current_user: dict = Depends(get_current_user)
):
    """
    Module de détection du sabotage intégré pour bloquer les irrigations folles.
    """
    if duree_minutes > 120:
        print(f"ALERTE SABOTAGE : Tentative d'irrigation excessive ({duree_minutes} min) par {current_user['username']}")
        raise HTTPException(
            status_code=400,
            detail="Action suspecte bloquée : Durée d'irrigation anormalement élevée. Sabotage possible."
        )
    
    if action.upper() not in ["DÉMARRER", "ARRÊTER"]:
        raise HTTPException(status_code=400, detail="Action non reconnue. Utilisez 'DÉMARRER' ou 'ARRÊTER'.")

    return {
        "message": f"Action '{action.upper()}' exécutée avec succès.",
        "details": f"Irrigation configurée pour {duree_minutes} minutes.",
        "responsable": current_user["full_name"]
    }


# ==========================================
# 7. LANCEMENT DU SERVEUR
# ==========================================

if __name__ == "__main__":
    # Configuré sur le port 8080 pour éviter les conflits avec Smart Clinic !
    uvicorn.run(app, host="127.0.0.1", port=8080)