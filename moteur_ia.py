from fastapi import FastAPI, HTTPException

app = FastAPI(title="Smart-Hydro Backend API")

# --- DONNÉES (Database simulée) ---
CULTURES = {
    "olivier": {"kc": 0.70, "nom": "Olivier"},
    "agrumes": {"kc": 0.85, "nom": "Agrumes"},
    "maraichage": {"kc": 1.15, "nom": "Culture Maraîchère"}
}

# --- LOGIQUE BACKEND (Calcul IA) ---
def calcul_besoin_eau(kc: float, eto: float = 6.2):
    return round(eto * kc, 2)

# --- ROUTES API (Endpoints) ---

@app.get("/")
def read_root():
    return {"status": "Online", "service": "Smart-Hydro IA Engine"}

@app.get("/api/recommandation/{plante}")
def get_recommandation(plante: str):
    plante_key = plante.lower()
    
    if plante_key not in CULTURES:
        raise HTTPException(status_code=404, detail="Plante non trouvée dans la base de données")
    
    info_plante = CULTURES[plante_key]
    besoin = calcul_besoin_eau(info_plante["kc"])
    
    # Réponse structurée (JSON) pour le Frontend
    return {
        "culture": info_plante["nom"],
        "coefficient_kc": info_plante["kc"],
        "besoin_journalier_mm": besoin,
        "conseil": "Arrosage recommandé tôt le matin" if besoin > 5 else "Arrosage modéré"
    }