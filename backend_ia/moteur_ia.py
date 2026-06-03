from fastapi import FastAPI, HTTPException, Depends, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
import uvicorn
import time

# --- CONFIGURATION SÉCURITÉ ---
SECRET_KEY = "votre_cle_secrete_tres_sure" # À changer en production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# --- BASE DE DONNÉES SIMULÉE ---
users_db = {
    "agriculteur1": {
        "username": "agriculteur1",
        "full_name": "Ahmed Benani",
        "email": "ahmed@example.com",
        "hashed_password": pwd_context.hash("password123"),
        "disabled": False,
    }
}

# --- FONCTIONS UTILITAIRES SÉCURITÉ ---
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

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
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
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

# 1. Initialisation de l'application Backend
app = FastAPI(
    title="Smart-Hydro Backend API",
    description="API de calcul des besoins en irrigation avec Sécurité Intégrée",
    version="1.1.0"
)

# --- MIDDLEWARE DE SURVEILLANCE ET INTÉGRITÉ ---
# Détecte les anomalies et les tentatives d'attaques
@app.middleware("http")
async def monitor_integrity_middleware(request: Request, call_next):
    # 1. Détection d'anomalies simples (ex: mots-clés suspects dans l'URL)
    suspicious_keywords = ["admin", "drop", "delete", "script", "select"]
    path = request.url.path.lower()
    
    for keyword in suspicious_keywords:
        if keyword in path and not path.startswith("/token"):
            # Blocage immédiat si suspect
            print(f"ALERTE SÉCURITÉ : Tentative d'accès suspecte détectée sur {path}")
            return HTTPException(
                status_code=403, 
                detail="Action bloquée par le système de surveillance Smart-Hydro."
            ).detail # Normalement on raise ou on retourne une Response
            # Pour FastAPI middleware, on retourne une Response :
            from fastapi.responses import JSONResponse
            return JSONResponse(
                status_code=403,
                content={"detail": "ALERTE : Action suspecte bloquée pour protéger les cultures."}
            )

    # 2. Mesure du temps de réponse (Performance monitoring)
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    
    # Si le temps de traitement est anormalement long, on le loggue
    if process_time > 2.0:
        print(f"ALERTE PERFORMANCE : Requête lente détectée ({process_time:.2f}s)")
        
    return response

# 2. Sécurité : Configuration CORS 
# Permet au frontend de ton groupe d'appeler ton API sans être bloqué
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Base de données des cultures (Le savoir métier)
# Ces coefficients Kc sont spécifiques aux plantations marocaines
CULTURES_MAROC = {
    "olivier": {"kc": 0.70, "nom": "Olivier"},
    "agrumes": {"kc": 0.85, "nom": "Agrumes (Orange/Citron)"},
    "maraichage": {"kc": 1.15, "nom": "Culture Maraîchère"}
}

# 4. Route pour obtenir le jeton JWT (Login)
@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
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

# 5. Route principale (Vérification du serveur)
@app.get("/")
def home():
    return {
        "projet": "Smart-Hydro",
        "auteur": "Asma",
        "statut": "Sécurisé",
        "docs": "/docs"
    }

# 6. Route de calcul (Le moteur IA) - PROTÉGÉE
@app.get("/api/recommandation/{plante}")
def obtenir_recommandation(
    plante: str, 
    ville: str = "Marrakech", 
    current_user: dict = Depends(get_current_user)
):
    """
    Calcule le besoin en eau précis selon la plante et la météo.
    Nécessite une authentification JWT.
    """
    plante_key = plante.lower()
    
    # Vérification si la plante existe
    if plante_key not in CULTURES_MAROC:
        raise HTTPException(
            status_code=404, 
            detail=f"La culture '{plante}' n'est pas répertoriée."
        )
    
    # Simulation de l'ETo (Évapotranspiration) via API météo
    eto_du_jour = 6.2 
    
    # Calcul final
    kc = CULTURES_MAROC[plante_key]["kc"]
    besoin_mm = round(eto_du_jour * kc, 2)
    
    return {
        "utilisateur": current_user["full_name"],
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

# 7. Route de contrôle de l'irrigation - PROTÉGÉE ET SURVEILLÉE
@app.post("/api/irrigation/controler")
async def controler_irrigation(
    action: str, 
    duree_minutes: int,
    current_user: dict = Depends(get_current_user)
):
    """
    Permet de lancer ou arrêter l'irrigation.
    Module de détection d'anomalies intégré pour bloquer le sabotage.
    """
    # Système de Détection d'Anomalies (Responsable Surveillance)
    if duree_minutes > 120: # Seuil de sécurité : pas plus de 2h d'irrigation
        print(f"ALERTE SABOTAGE : Tentative d'irrigation excessive ({duree_minutes} min) par {current_user['username']}")
        raise HTTPException(
            status_code=400,
            detail="Action suspecte bloquée : Durée d'irrigation anormalement élevée. Sabotage possible."
        )
    
    if action not in ["DÉMARRER", "ARRÊTER"]:
        raise HTTPException(status_code=400, detail="Action non reconnue.")

    return {
        "message": f"Action '{action}' exécutée avec succès.",
        "details": f"Irrigation pour {duree_minutes} minutes.",
        "responsable": current_user["full_name"]
    }

# 8. Lancement du serveur
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)