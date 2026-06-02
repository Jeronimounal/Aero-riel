# ✈ Aero-Riel Sostenible — Sitio Web

> Movilidad aérea ligera, modular y automatizada  
> Universidad Nacional de Colombia · Facultad de Minas · 2026

---

## 🚀 Cómo correr el proyecto

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar el servidor (producción)
```bash
npm start
```

### 3. Iniciar con recarga automática (desarrollo)
```bash
npm run dev
```

Abre tu navegador en **http://localhost:3000**

---

## 📁 Estructura del proyecto

```
aeroriel-web/
│
├── server.js              # Servidor Express principal
├── package.json           # Dependencias del proyecto
├── .gitignore
├── README.md
│
├── routes/
│   └── index.js           # Rutas del servidor
│
└── public/                # Archivos estáticos (frontend)
    ├── index.html         # Página principal
    │
    ├── css/
    │   └── styles.css     # Estilos globales
    │
    ├── js/
    │   └── main.js        # JavaScript del sitio
    │
    └── images/
        ├── renders/       # Renders 3D del proyecto (doc18)
        │   ├── render_1.jpg
        │   ├── render_2.jpg
        │   └── ... (20 renders)
        │
        └── quijote/       # ← COLOCAR AQUÍ las imágenes del PDF quijote
            └── (vacío — agregar imágenes del quijote aquí)
```

---

## 🖼 Cómo agregar las imágenes del quijote

1. Abre el PDF `quijote.pdf` y exporta las imágenes como `.jpg` o `.png`
2. Cópialas a la carpeta `public/images/quijote/`
3. Nombres sugeridos: `quijote_1.jpg`, `quijote_2.jpg`, etc.
4. El servidor las sirve automáticamente en `/images/quijote/nombre.jpg`

---

## 🌐 API endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/` | Página principal |
| `GET` | `/api/renders` | Lista de todas las imágenes disponibles (JSON) |

---

## ⚙️ Requisitos

- Node.js >= 16
- npm >= 8

---

## 👥 Equipo

- Isabella Vélez Ospina  
- Jerónimo Morales Sierra  
- Santiago Hurtado Giraldo  
- Juan Andrés Jiménez Vélez  
- Anthony Ochoa Henao  
- Algerniro José Amaya González  
- Laura María Solano Castañeda  
- Angela Yineth Acosta Alfonso  

**Director:** Diego Alexander Herrera Uribe  
**Proyecto Integrado de Ingeniería — Facultad de Minas, UNAL Medellín**
