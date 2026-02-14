# FALOBOULA AGROBUSINESS SUARL — Site statique

Site HTML/CSS/JS statique (sans back-end) prêt pour Netlify ou GitHub Pages.

## ✅ Fonctionnalités
- SEO : meta description/keywords + Open Graph
- Accessibilité : skip link, aria-label, labels de formulaire
- Navigation : sticky + hamburger (≤ 768px)
- Sections : À propos, Services, Valeurs, Galerie, Témoignages, Actualités
- Contact : **Netlify Forms** + validation JS + messages succès/erreur
- CTA : bouton WhatsApp flottant (message prérempli)
- Légal : page `confidentialite.html`
- Carte : Google Maps iframe (à personnaliser)

## 📁 Arborescence recommandée
```
/
  index.html
  confidentialite.html
  styles.css
  main.js
  favicon.svg
  logo.png
  /assets
    /images
      prod1.webp
      prod2.webp
      prod3.webp
      prod4.webp
      prod5.webp
```

## 🖼️ Images (Galerie)
Place tes images dans `assets/images/` puis remplace les placeholders dans `index.html`
(par exemple `prod1.webp`, etc.). Utilise WebP/JPEG compressés.

## 📨 Netlify Forms
Le formulaire fonctionne automatiquement sur Netlify si :
- le formulaire a `data-netlify="true"`
- `name="contact"` est présent
- un `form-name` hidden est présent

Déploiement : connecte le repo GitHub sur Netlify → Deploy.

## 🚀 Déploiement Netlify
1. Push sur GitHub
2. Netlify → Add new site → Import from Git → GitHub
3. Build command : (vide)
4. Publish directory : `.`
5. Deploy

## 🔎 Lighthouse
- Compresser images (WebP)
- Limiter scripts externes
- Vérifier contrastes et titres (H1/H2)
