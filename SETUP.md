# Setup Guide - Frontend Senior Lab

## Quick Start (Modo Demo - Sin Firebase)

La app funciona out-of-the-box sin ninguna configuracion externa:

```bash
npm install
npx nx serve web
```

Abre http://localhost:4200 y registra una cuenta. Los datos se guardan en localStorage.

---

## Production Setup (Firebase - Gratis)

Para habilitar autenticacion real y persistencia en la nube, sigue estos pasos:

### 1. Crear proyecto en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" (o "Agregar proyecto")
3. Nombre: `frontend-senior-lab` (o el que prefieras)
4. Desactiva Google Analytics (no lo necesitamos)
5. Click "Create project"

### 2. Habilitar Authentication

1. En el menu izquierdo: **Build > Authentication**
2. Click "Get started"
3. Tab "Sign-in method"
4. Habilita **Email/Password** (el primero de la lista)
5. Click "Save"

### 3. Crear Firestore Database

1. En el menu izquierdo: **Build > Firestore Database**
2. Click "Create database"
3. Selecciona la ubicacion mas cercana (ej: `us-central1`)
4. Selecciona "Start in **test mode**" (despues lo aseguraremos)
5. Click "Create"

### 4. Registrar la Web App

1. Ve a **Project Settings** (icono de engranaje arriba a la izquierda)
2. En la seccion "Your apps", click el icono `</>` (Web)
3. Nombre: `frontend-senior-lab-web`
4. **NO** marques "Firebase Hosting" (usamos GitHub Pages)
5. Click "Register app"
6. Firebase te mostrara un bloque de codigo con tu configuracion:

```javascript
const firebaseConfig = {
  apiKey: 'AIzaSy...',
  authDomain: 'tu-proyecto.firebaseapp.com',
  projectId: 'tu-proyecto',
  storageBucket: 'tu-proyecto.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abc123',
};
```

### 5. Configurar el proyecto

Copia esos valores en **dos archivos**:

**`apps/web/src/environments/environment.ts`** (desarrollo):

```typescript
export const environment = {
  production: false,
  useFirebase: true, // <-- cambiar a true
  firebase: {
    apiKey: 'TU_API_KEY',
    authDomain: 'TU_PROYECTO.firebaseapp.com',
    projectId: 'TU_PROYECTO',
    storageBucket: 'TU_PROYECTO.appspot.com',
    messagingSenderId: 'TU_SENDER_ID',
    appId: 'TU_APP_ID',
  },
};
```

**`apps/web/src/environments/environment.prod.ts`** (produccion):

```typescript
export const environment = {
  production: true,
  useFirebase: true, // <-- cambiar a true
  firebase: {
    apiKey: 'TU_API_KEY',
    authDomain: 'TU_PROYECTO.firebaseapp.com',
    projectId: 'TU_PROYECTO',
    storageBucket: 'TU_PROYECTO.appspot.com',
    messagingSenderId: 'TU_SENDER_ID',
    appId: 'TU_APP_ID',
  },
};
```

### 6. Asegurar Firestore (Reglas de seguridad)

En Firebase Console > Firestore > Rules, reemplaza las reglas por:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Click "Publish".

### 7. Deploy

```bash
npx nx build web
# El output esta en dist/apps/web/browser/
# Sube a GitHub Pages (automatico) o Firebase Hosting
```

---

## Activar GitHub Pages

1. Ve a tu repo en GitHub > Settings > Pages
2. Source: **GitHub Actions**
3. El deploy es automatico en cada push a main

Tu app estara en: `https://TU_USUARIO.github.io/frontend-senior-lab/`

---

## Costos

| Servicio      | Plan           | Limite                    | Costo      |
| ------------- | -------------- | ------------------------- | ---------- |
| Firebase Auth | Spark (gratis) | 50,000 usuarios/mes       | $0         |
| Firestore     | Spark (gratis) | 1 GB, 50K lecturas/dia    | $0         |
| GitHub Pages  | Free           | Repos publicos ilimitados | $0         |
| **Total**     |                |                           | **$0/mes** |

---

## Estructura de datos en Firestore

```
users/
  {userId}/
    profile/
      data: { name, email, role, createdAt }
    diagnostic/
      current: { score, percentage, level, categories, ... }
      history: [{ result, completedAt }, ...]
    learning/
      progress: { completedTopicIds, activeModuleId }
    interviews/
      progress: { reviewedQuestionIds, lastQuestionId }
    achievements/
      unlocked: [{ id, unlockedAt }, ...]
```

---

## Comandos utiles

```bash
# Desarrollo
npx nx serve web

# Build produccion
npx nx build web

# Tests
npx nx test web --run

# Lint + Typecheck
npx nx lint web
npx nx typecheck web

# E2E tests
npx nx e2e web-e2e

# Formatear codigo
npx nx format:write
```
