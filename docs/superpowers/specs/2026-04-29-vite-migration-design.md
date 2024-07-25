# Migration CRA → Vite

## Contexte

Portfolio React (guillaume-rce.github.io) actuellement bundlé avec `react-scripts` 5.0.1 (Create React App). L'objectif est de remplacer CRA par Vite pour un démarrage plus rapide et un build plus léger.

## Périmètre

- Pas de TypeScript (fichiers `.js` uniquement)
- Pas de tests à migrer
- Déploiement GitHub Pages via `gh-pages`
- 3 variables d'environnement EmailJS (`REACT_APP_*`)

## Changements

### 1. Dépendances

Supprimer : `react-scripts`

Ajouter (devDependencies) :
- `vite`
- `@vitejs/plugin-react`

### 2. `vite.config.js` (nouveau, à la racine)

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
})
```

### 3. `index.html`

- Déplacer de `public/index.html` → `index.html` (racine du projet)
- Remplacer toutes les occurrences de `%PUBLIC_URL%` par `/`
- Ajouter avant `</body>` : `<script type="module" src="/src/index.js"></script>`
- Les assets de `public/` continuent d'être servis tels quels par Vite

### 4. Variables d'environnement

Dans `src/components/contact/ContactForm.js` :
- `process.env.REACT_APP_SERVICE_ID` → `import.meta.env.VITE_SERVICE_ID`
- `process.env.REACT_APP_TEMPLATE_ID` → `import.meta.env.VITE_TEMPLATE_ID`
- `process.env.REACT_APP_PUBLIC_KEY` → `import.meta.env.VITE_PUBLIC_KEY`

Dans le fichier `.env` :
```
VITE_SERVICE_ID=groche_portfolio_contact
VITE_TEMPLATE_ID=portfolio_contact_form
VITE_PUBLIC_KEY=l9hH9JXozZD5p4MiG
```

Note : Vite n'expose au navigateur que les variables préfixées `VITE_` — c'est pourquoi on garde ce préfixe court au lieu de `REACT_APP_`.

### 5. Scripts `package.json`

```json
"scripts": {
  "start": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Vite génère le build dans `dist/` (au lieu de `build/`).

### 6. Nettoyage

- Supprimer `src/setupTests.js`
- Supprimer `src/reportWebVitals.js`
- Retirer l'import et l'appel de `reportWebVitals` dans `src/index.js`
- Retirer le bloc `eslintConfig` du `package.json` (dépendait de `react-app`)
- Retirer le bloc `browserslist` du `package.json` (géré par Vite en interne)

## Points d'attention

- `HashRouter` reste inchangé — il n'y a pas de config serveur à adapter pour GitHub Pages
- Les imports d'assets (images, etc.) fonctionnent de la même façon avec Vite
- Vite ne supporte pas `NODE_PATH` ou les alias `src/` implicites de CRA — si des imports absolus existent, il faudra ajouter un alias dans `vite.config.js`. À vérifier lors de l'implémentation.
