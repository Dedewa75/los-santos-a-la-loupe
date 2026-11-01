// =====================================================
// Configuration de l'appli communautaire
// Ces 2 valeurs sont PUBLIQUES (prévues pour être dans le navigateur).
// Supabase > Project Settings > API :
//   - SUPABASE_URL      = "Project URL"
//   - SUPABASE_ANON_KEY = clé "anon" / "public"
// ⚠️ Ne mets JAMAIS ici la clé "service_role" (elle est secrète).
// Tant que c'est vide, la page affiche « La communauté arrive bientôt ».
// =====================================================
window.LSL_CONFIG = {
  SUPABASE_URL: "",
  SUPABASE_ANON_KEY: ""
};
