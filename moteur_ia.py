from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
import uvicorn
import jwt
from datetime import datetime, timedelta
from pydantic import BaseModel

# ==========================================
# 1. INITIALISATION & CONFIGURATION SÉCURITÉ
# ==========================================

app = FastAPI(
    title="Smart-Hydro Backend API",
    description="API de calcul des besoins en irrigation basée sur l'IA, sécurisée par JWT Tokens",
    version="1.1.0"
)

# Configuration CORS pour permettre au frontend ou à Node.js de t'appeler
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration pour signer les Jetons d'autorisation (JWT)
SECRET_KEY = "SUPER_SECRET_SMART_HYDRO_KEY_UPM"
ALGORITHM = "HS256"

# Cet outil va intercepter automatiquement le Token Bearer envoyé par le Front/Node.js
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/login")


# ==========================================
# 2. MODÈLES DE DONNÉES (PYDANTIC) & DATA
# ==========================================

# Modèle pour recevoir les données de connexion
class LoginRequest(BaseModel):
    username: str
    password: str

# Base de données des cultures (Le savoir métier marocain)
CULTURES_MAROC = {
    "olivier": {"kc": 0.70, "nom": "Olivier"},
    "agrumes": {"kc": 0.85, "nom": "Agrumes (Orange/Citron)"},
    "maraichage": {"kc": 1.15, "nom": "Culture Maraîchère"}
}


# ==========================================
# 3. FONCTIONS OUTILS D'AUTHENTIFICATION
# ==========================================

def verifier_autorisation(token: str = Depends(oauth2_scheme)):
    """
    La barrière de sécurité : décode le token et lève une erreur 401 si le token
    est invalide ou expiré, empêchant l'accès au Dashboard.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload  # Contient les infos de l'utilisateur connecté
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Accès refusé : Vous devez avoir une autorisation système (Token valide)."
        )


# ==========================================
# 4. ROUTES DE L'API (ENDPOINTS)
# ==========================================

# Route principale publique (Vérification du serveur)
@app.get("/")
def home():
    return {
        "projet": "Smart-Hydro",
        "auteur": "Asma",
        "statut": "Opérationnel",
        "securite": "Activée (JWT)",
        "docs": "/docs"
    }

# ROUTE DE LOGIN (Publique) : Délivre le passeport d'authentification
@app.post("/api/login")
def login(data: LoginRequest):
    """
    Vérifie les identifiants à la première connexion et génère le jeton d'autorisation.
    """
    # Test d'identifiants (À lier à une base de données plus tard si besoin)
    if data.username == "admin" and data.password == "admin123":
        # Le token expirera automatiquement après 2 heures
        expiration = datetime.utcnow() + timedelta(hours=2)
        payload = {"sub": data.username, "exp": expiration}
        
        token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
        return {
            "access_token": token, 
            "token_type": "bearer", 
            "message": "Première connexion réussie ! Bienvenue sur le système."
        }
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Identifiants (Nom d'utilisateur ou mot de passe) incorrects."
    )

# ROUTE DE CALCUL IA (Sécurisée par Depends)
@app.get("/api/recommandation/{plante}")
def obtenir_recommandation(plante: str, ville: str = "Marrakech", user_data: dict = Depends(verifier_autorisation)):
    """
    Calcule le besoin en eau précis selon la plante et la météo.
    SÉCURISÉ : Nécessite obligatoirement un token d'autorisation valide.
    Formule : Besoin = ETo (météo) x Kc (plante)
    """
    plante_key = plante.lower()
    
    # Vérification si la plante existe
    if plante_key not in CULTURES_MAROC:
        raise HTTPException(
            status_code=404, 
            detail=f"La culture '{plante}' n'est pas répertoriée."
        )
    
    # Simulation de l'ETo (Évapotranspiration) via API météo à Marrakech
    eto_du_jour = 6.2 
    
    # Calcul agronomique IA
    kc = CULTURES_MAROC[plante_key]["kc"]
    besoin_mm = round(eto_du_jour * kc, 2)
    
    return {
        "info_calcul": {
            "ville": ville,
            "eto_reference_mm": eto_du_jour,
            "coefficient_kc": kc,
            "autorisé_par_utilisateur": user_data["sub"] # Prouve que le token a extrait l'utilisateur
        },
        "resultat": {
            "plante": CULTURES_MAROC[plante_key]["nom"],
            "besoin_eau_mm": besoin_mm,
            "unite": "millimètres par jour",
            "recommandation": "Optimiser l'irrigation pour économiser 30% d'eau"
        }
    }


# ==========================================
# 5. LANCEMENT DU SERVEUR
# ==========================================

if __name__ == "__main__":
   uvicorn.run(app, host="127.0.0.1", port=8080)