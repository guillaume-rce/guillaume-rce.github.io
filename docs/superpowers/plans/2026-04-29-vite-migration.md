# Vite Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer `react-scripts` (CRA) par Vite comme bundler du portfolio.

**Architecture:** Vite prend en charge directement le `index.html` à la racine du projet comme point d'entrée ; les assets `public/` sont servis tels quels. Les variables d'environnement exposées au navigateur doivent avoir le préfixe `VITE_`.

**Tech Stack:** Vite 6.x, @vitejs/plugin-react, gh-pages

---

### Task 1 : Remplacer les dépendances

**Files:**
- Modify: `package.json`

- [ ] **Step 1 : Désinstaller react-scripts**

```bash
npm uninstall react-scripts
```

- [ ] **Step 2 : Installer Vite et son plugin React**

```bash
npm install --save-dev vite @vitejs/plugin-react
```

- [ ] **Step 3 : Vérifier `package.json`**

Confirme que `react-scripts` a disparu de `dependencies` et que `vite` + `@vitejs/plugin-react` sont dans `devDependencies`.

- [ ] **Step 4 : Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: replace react-scripts with vite"
```

---

### Task 2 : Créer `vite.config.js`

**Files:**
- Create: `vite.config.js`

- [ ] **Step 1 : Créer le fichier**

Créer `vite.config.js` à la racine du projet avec ce contenu :

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
})
```

- [ ] **Step 2 : Commit**

```bash
git add vite.config.js
git commit -m "feat: add vite config"
```

---

### Task 3 : Migrer `index.html`

**Files:**
- Modify: `public/index.html` → déplacer vers `index.html` (racine)

Vite utilise `index.html` à la racine comme point d'entrée, pas dans `public/`.

- [ ] **Step 1 : Déplacer le fichier**

```bash
mv public/index.html index.html
```

- [ ] **Step 2 : Remplacer `%PUBLIC_URL%`**

Dans `index.html`, remplacer toutes les occurrences de `%PUBLIC_URL%/` par `/` (et `%PUBLIC_URL%` seul par `/`).

Avant :
```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
<link rel="apple-touch-icon" href="%PUBLIC_URL%/icon.png" />
<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
```

Après :
```html
<link rel="icon" href="/favicon.ico" />
<link rel="apple-touch-icon" href="/icon.png" />
<link rel="manifest" href="/manifest.json" />
```

- [ ] **Step 3 : Ajouter le script d'entrée**

Ajouter juste avant `</body>` :

```html
    <script type="module" src="/src/index.js"></script>
  </body>
```

- [ ] **Step 4 : Supprimer les commentaires CRA**

Supprimer les blocs de commentaires HTML générés par CRA (les `<!-- Notice the use of %PUBLIC_URL%... -->` etc.) pour garder le fichier propre.

- [ ] **Step 5 : Commit**

```bash
git add index.html public/index.html
git commit -m "feat: move index.html to root for Vite"
```

---

### Task 4 : Mettre à jour les variables d'environnement

**Files:**
- Modify: `.env`
- Modify: `src/components/contact/ContactForm.js:83-86`

- [ ] **Step 1 : Renommer les clés dans `.env`**

Remplacer le contenu de `.env` par :

```
VITE_SERVICE_ID=groche_portfolio_contact
VITE_TEMPLATE_ID=portfolio_contact_form
VITE_PUBLIC_KEY=l9hH9JXozZD5p4MiG
```

- [ ] **Step 2 : Mettre à jour `ContactForm.js`**

Dans `src/components/contact/ContactForm.js`, lignes 83-86, remplacer :

```js
emailjs.sendForm(
    process.env.REACT_APP_SERVICE_ID,
    process.env.REACT_APP_TEMPLATE_ID,
    form.current,
    process.env.REACT_APP_PUBLIC_KEY
)
```

Par :

```js
emailjs.sendForm(
    import.meta.env.VITE_SERVICE_ID,
    import.meta.env.VITE_TEMPLATE_ID,
    form.current,
    import.meta.env.VITE_PUBLIC_KEY
)
```

- [ ] **Step 3 : Commit**

`.env` ne doit pas être commité s'il contient de vraies clés. Vérifier `.gitignore` d'abord :

```bash
grep -n ".env" .gitignore
```

Si `.env` est ignoré, commiter uniquement `ContactForm.js` :

```bash
git add src/components/contact/ContactForm.js
git commit -m "feat: migrate env vars to Vite VITE_ prefix"
```

---

### Task 5 : Mettre à jour les scripts `package.json`

**Files:**
- Modify: `package.json`

- [ ] **Step 1 : Remplacer le bloc `scripts`**

Dans `package.json`, remplacer :

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
},
```

Par :

```json
"scripts": {
  "start": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
},
```

- [ ] **Step 2 : Commit**

```bash
git add package.json
git commit -m "feat: update npm scripts for Vite"
```

---

### Task 6 : Nettoyage des fichiers CRA

**Files:**
- Delete: `src/setupTests.js`
- Delete: `src/reportWebVitals.js`
- Modify: `src/index.js`
- Modify: `package.json`

- [ ] **Step 1 : Supprimer les fichiers CRA-specific**

```bash
rm src/setupTests.js src/reportWebVitals.js
```

- [ ] **Step 2 : Nettoyer `src/index.js`**

Supprimer les lignes liées à `reportWebVitals` dans `src/index.js` :

Avant (lignes 1-42) :
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// ... autres imports ...
import reportWebVitals from './reportWebVitals';
// ...

reportWebVitals();
```

Après — supprimer la ligne d'import et l'appel :
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Home from './pages/Home';
import Projects from './pages/Projects';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import Cv from './pages/Cv';

import './translations/i18n';

import { HashRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { ProjectsProvider } from './context/ProjectsContext';
import { PaintsProvider } from './context/PaintsContext';
import { PrizeProvider } from './context/PrizeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <ProjectsProvider>
        <PaintsProvider>
          <PrizeProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/projects" component={Projects} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/projects/:id" component={Projects} />
              <Route exact path="/cv" component={Cv} />
              <Route component={NotFound} />
            </Switch>
          </PrizeProvider>
        </PaintsProvider>
      </ProjectsProvider>
    </Router>
  </React.StrictMode>
);
```

- [ ] **Step 3 : Supprimer `eslintConfig` et `browserslist` de `package.json`**

Supprimer ces deux blocs de `package.json` (gérés en interne par Vite) :

```json
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest"
  ]
},
"browserslist": {
  "production": [...],
  "development": [...]
},
```

- [ ] **Step 4 : Commit**

```bash
git add src/setupTests.js src/reportWebVitals.js src/index.js package.json
git commit -m "chore: remove CRA-specific files and config"
```

---

### Task 7 : Vérification

- [ ] **Step 1 : Lancer le serveur de dev**

```bash
npm start
```

Attendu : Vite démarre sur `http://localhost:5173` (ou port disponible), le site s'affiche correctement.

- [ ] **Step 2 : Vérifier le build de production**

```bash
npm run build
```

Attendu : dossier `dist/` créé sans erreur.

- [ ] **Step 3 : Prévisualiser le build**

```bash
npm run preview
```

Attendu : le site servi depuis `dist/` fonctionne sur `http://localhost:4173`.

- [ ] **Step 4 : Commit final si tout est OK**

```bash
git add .
git commit -m "chore: Vite migration complete"
```
