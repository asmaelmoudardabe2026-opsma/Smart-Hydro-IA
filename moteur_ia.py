from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# 1. Initialisation de l'application Backend
app = FastAPI(
    title="Smart-Hydro Backend API",
    description="API de calcul des besoins en irrigation basée sur l'IA et les données météo",
    version="1.0.0"
)

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

# 4. Route principale (Vérification du serveur)
@app.get("/")
def home():
    return {
        "projet": "Smart-Hydro",
        "auteur": "Asma",
        "statut": "Opérationnel",
        "docs": "/docs"
    }

# 5. Route de calcul (Le moteur IA)
@app.get("/api/recommandation/{plante}")
def obtenir_recommandation(plante: str, ville: str = "Marrakech"):
    """
    Calcule le besoin en eau précis selon la plante et la météo.
    Formule : Besoin = ETo (météo) x Kc (plante)
    """
    plante_key = plante.lower()
    
    # Vérification si la plante existe
    if plante_key not in CULTURES_MAROC:
        raise HTTPException(
            status_code=404, 
            detail=f"La culture '{plante}' n'est pas répertoriée."
        )
    
    # Simulation de l'ETo (Évapotranspiration) via API météo
    # À Marrakech, la moyenne est d'environ 6.2mm par jour
    eto_du_jour = 6.2 
    
    # Calcul final
    kc = CULTURES_MAROC[plante_key]["kc"]
    besoin_mm = round(eto_du_jour * kc, 2)
    
    return {
        "info_calcul": {
            "ville": ville,
            "eto_reference_mm": eto_du_jour,
            "coefficient_kc": kc
        },
        "resultat": {
            "plante": CULTURES_MAROC[plante_key]["nom"],
            "besoin_eau_mm": besoin_mm,
            "unite": "millimètres par jour",
            "recommandation": "Optimiser l'irrigation pour économiser 30% d'eau"
        }
    }

# 6. Lancement du serveur
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)