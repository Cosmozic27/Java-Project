# FoodBridge 🍲🌱

FoodBridge is a food waste management and surplus-food redistribution platform connecting food donors (restaurants, hostels, canteens, event organizers), NGOs/organizations that collect surplus food, and platform administrators.

---

## Tech Stack

- **Framework:** React.js (v19) + Vite (v8)
- **Styling:** Tailwind CSS (v4) with centralized design token architecture
- **Routing:** React Router DOM (v7)
- **Icons:** Lucide React
- **Animation:** Framer Motion
- **HTTP Client:** Axios
- **Form Management:** React Hook Form
- **Data Visualization:** Recharts
- **Geospatial & Maps:** Leaflet & React Leaflet
- **Linter:** Oxlint

---

## Project Structure

```text
src/
├── assets/             # Static graphics, icons, brand assets
├── components/
│   ├── common/         # Button, PageContainer, PageHeader, etc.
│   ├── navigation/     # Navbar, Sidebar, NavLink, Breadcrumbs
│   ├── forms/          # Form fields, inputs, validation primitives
│   ├── cards/          # Card primitive, CardHeader, CardContent, etc.
│   ├── feedback/       # Modals, alerts, notifications, loaders
│   └── data-display/   # Tables, stat cards, food cards, status badges
├── layouts/            # MainLayout, AuthLayout, Dashboard layouts
├── pages/
│   ├── public/         # Landing, About, Contact
│   ├── auth/           # Login, Register, Forgot Password
│   ├── donor/          # Donor portal pages
│   ├── ngo/            # NGO portal pages
│   └── admin/          # Admin portal pages
├── routes/             # Centralized routing configuration
├── services/           # API clients and HTTP endpoints
├── hooks/              # Reusable custom React hooks
├── utils/              # Utility helpers (cn, formatters)
├── constants/          # Design tokens (colors, typography, shadows)
├── styles/             # Global stylesheets and token definitions
├── App.jsx             # Root application shell
└── main.jsx            # Application DOM entry point
```

---

## Design System & Tokens

FoodBridge uses a centralized design-token system defined in `src/constants/tokens.js` and `src/styles/global.css`:

- **Primary:** `#16A34A`
- **Primary Dark:** `#15803D`
- **Accent:** `#84CC16`
- **Background:** `#F7FAF8`
- **Surface:** `#FFFFFF`
- **Primary Text:** `#17211C`
- **Secondary Text:** `#64748B`
- **Border:** `#E2E8E4`
- **Success:** `#16A34A` | **Warning:** `#F59E0B` | **Danger:** `#EF4444` | **Info:** `#2563EB`
- **Typography:** Plus Jakarta Sans & Inter

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Run Linter
```bash
npm run lint
```

### 4. Build for Production
```bash
npm run build
```
