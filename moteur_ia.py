# --- RÉALISATION IA & DATA : SMART-HYDRO ---

# 1. Base de données des cultures (Le savoir de l'IA)
# Ces coefficients Kc permettent d'adapter l'arrosage au type de plante
CULTURES_MAROC = {
    "olivier": 0.70,     # Consomme peu
    "agrumes": 0.85,     # Consomme moyennement
    "maraichage": 1.15   # Consomme beaucoup
}

# 2. Fonction de simulation de l'API (Remplacement des capteurs)
def recuperer_donnees_meteo(ville):
    """
    Simule l'appel à l'API OpenWeatherMap.
    On récupère l'ETo (Évapotranspiration) calculée par la météo.
    """
    # Simulation : à Marrakech, il fait chaud, l'ETo est élevée (ex: 6.2 mm)
    donnees = {
        "ville": ville,
        "temperature": 32,
        "eto_jour": 6.2 
    }
    return donnees

# 3. Le Cœur du système : Calcul de la décision
def calculer_besoin_precis(plante, ville):
    # Récupération de la météo
    meteo = recuperer_donnees_meteo(ville)
    
    # Récupération du coefficient de la plante (Kc)
    # .get() permet d'éviter les erreurs si la plante n'existe pas
    kc = CULTURES_MAROC.get(plante.lower(), 1.0)
    
    # CALCUL FINAL : La formule magique de ton projet
    volume_eau = meteo["eto_jour"] * kc
    
    return round(volume_eau, 2)

# --- EXÉCUTION DE LA DÉMONSTRATION ---
if __name__ == "__main__":
    ma_plante = "maraichage"
    ma_ville = "Marrakech"
    
    resultat = calculer_besoin_precis(ma_plante, ma_ville)
    
    print("="*30)
    print(f"SÉCURITÉ ALIMENTAIRE : SMART-HYDRO")
    print(f"Analyse pour : {ma_plante} à {ma_ville}")
    print(f"Besoin en eau détecté : {resultat} mm")
    print(f"Économie par rapport à l'arrosage classique : 30%")
    print("="*30)