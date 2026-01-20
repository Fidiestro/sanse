# Plan de Desarrollo - Sanse Capital

## Visión General

Transformar la landing page actual de Sanse Capital en una aplicación web completa:
- Landing page informativa (pública)
- Sistema de autenticación (login con roles)
- Dashboard para inversionistas (ver balance y rendimiento)
- Dashboard para admin (gestionar fondo, registrar movimientos)

---

## Información del Negocio

### Datos Generales
| Campo | Valor |
|-------|-------|
| **Nombre** | Sanse Capital |
| **Tipo** | Fondo privado de inversión y préstamos entre particulares |
| **País** | Colombia |
| **Moneda** | COP (Pesos colombianos) |
| **Operación** | Digital |
| **Dominio** | sansecapital.co |

### Contacto
| Canal | Valor |
|-------|-------|
| **Email** | sansefinance@outlook.com |
| **Teléfono** | 3194552890 |
| **Twitter/X** | https://x.com/sansecapital |
| **Instagram** | https://www.instagram.com/sansecapital |

### Equipo Administrativo
| Nombre | Rol |
|--------|-----|
| Sebastián Fandiño | Fundador |
| Diego | Administrador |

### Branding
| Recurso | Archivo |
|---------|---------|
| Logo (con fondo) | `logo_sanse.jpeg` |
| Logo (sin fondo) | `logo_sanse_sin_fondo.png` |
| Color principal | Negro (#1a1a1a aproximado) |
| Términos y condiciones | `Terminos_y_Condiciones_Sanse_Capital_v3.pdf` |

---

## Reglas de Negocio (del PDF)

### Retiros de Capital
- Solo permitidos al **cierre de cada mes calendario**
- No se permiten retiros fuera de estas fechas
- **Límite sin aviso previo:** $2,000,000 COP
- **Retiros mayores:** Requieren notificación con 30 días de anticipación

### Sistema de Ahorro
- Participantes en cadena de ahorro deben cumplir aportes puntualmente
- **Incumplimiento:** Capital usado como colateral + sanción de $5,000 COP

### Préstamos
| Tipo | Tasa mensual |
|------|--------------|
| Socios del fondo | 4% |
| No socios | 6% |

- Abono obligatorio a capital cada mes + pago de intereses
- Capital ahorrado sirve como garantía
- Incumplimiento puede derivar en acciones legales

### Rentabilidad
- **No es fija ni garantizada**
- Varía según las inversiones del fondo

---

## Tipos de Transacción (para el sistema)

| Tipo | Descripción |
|------|-------------|
| `APORTE` | Ingreso de capital al fondo |
| `RETIRO` | Retiro de capital (solo fin de mes) |
| `PRESTAMO_OTORGADO` | Préstamo dado a un participante |
| `PAGO_PRESTAMO` | Pago de préstamo (capital + intereses) |
| `RENDIMIENTO` | Distribución de ganancias |
| `SANCION` | Penalización por incumplimiento ($5,000 COP) |

---

## Arquitectura Técnica

```
┌─────────────────────────────────────┐
│            FRONTEND                  │
│          Next.js 14 (React)          │
│           📁 apps/web                │
│  - Landing page                      │
│  - Dashboard UI                      │
│  - Consume API REST                  │
└──────────────┬──────────────────────┘
               │ HTTP/REST (JSON)
               ▼
┌─────────────────────────────────────┐
│            BACKEND                   │
│              NestJS                  │
│           📁 apps/api                │
│  - API REST                          │
│  - Autenticación JWT                 │
│  - Lógica de negocio                 │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│         BASE DE DATOS                │
│           PostgreSQL                 │
└─────────────────────────────────────┘
```

---

## Repositorio

- **URL:** git@github.com:Fidiestro/sanse.git
- **Estrategia:** Monorepo (apps/web + apps/api)
- **Hosting actual:** GitHub Pages (será migrado)

---

## Stack Tecnológico

### Frontend (apps/web)
| Tecnología | Versión | Uso |
|------------|---------|-----|
| Next.js | 14 | Framework React |
| TypeScript | 5.x | Tipado estático |
| Tailwind CSS | 3.x | Estilos |
| Axios | - | Consumo de API |
| Zustand | - | Estado global |
| React Hook Form | - | Formularios |

### Backend (apps/api)
| Tecnología | Uso |
|------------|-----|
| NestJS | Framework backend |
| TypeScript | Tipado estático |
| Prisma | ORM |
| PostgreSQL | Base de datos |
| JWT + Passport | Autenticación |
| Swagger | Documentación API |

---

## Estructura del Monorepo

```
sanse/
├── apps/
│   ├── web/                    # Frontend - Next.js 14
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── lib/
│   │   │   ├── hooks/
│   │   │   └── types/
│   │   ├── public/
│   │   ├── package.json
│   │   └── ...
│   │
│   └── api/                    # Backend - NestJS
│       ├── src/
│       │   ├── modules/
│       │   │   ├── auth/
│       │   │   ├── users/
│       │   │   ├── fund/
│       │   │   ├── transactions/
│       │   │   └── loans/
│       │   └── ...
│       ├── prisma/
│       └── package.json
│
├── legacy/                     # Código actual (respaldo)
│   ├── index.html
│   ├── style.css
│   └── index.js
│
├── logo_sanse.jpeg
├── logo_sanse_sin_fondo.png
├── Terminos_y_Condiciones_Sanse_Capital_v3.pdf
├── package.json
├── PLAN.md
└── README.md
```

---

## Fases del Proyecto

### FASE 1: Migración Frontend a Next.js 14
**Objetivo:** Migrar landing actual a Next.js.

#### 1.1 Reestructurar repositorio
- [x] Crear estructura de carpetas (apps/, legacy/)
- [x] Mover archivos actuales a legacy/
- [x] Configurar package.json raíz con workspaces
- [x] Actualizar .gitignore

#### 1.2 Setup Next.js 14
- [x] Crear proyecto en apps/web
- [x] Configurar TypeScript
- [x] Configurar Tailwind CSS
- [x] Configurar ESLint y Prettier

#### 1.3 Migrar landing
- [x] Layout (Header con logo real, Footer con redes sociales)
- [x] Sección Hero
- [x] Sección About
- [x] Sección Services
- [x] Sección Portfolio
- [x] Sección Contact (email y teléfono reales)
- [x] Navegación responsive

#### 1.4 Mejoras UI/UX
- [x] Integrar logo_sanse_sin_fondo.png
- [x] Aplicar color negro como principal
- [x] Favicon (generar desde logo)
- [x] Meta tags SEO y Open Graph
- [x] Links a Twitter/X e Instagram
- [x] Testing responsive

#### 1.5 Funcionalidad
- [x] Smooth scroll
- [x] Botón "Iniciar sesión" en header
- [x] Página 404

---

### FASE 2: Setup Backend NestJS
**Objetivo:** Crear backend con autenticación.

#### 2.1 Setup proyecto
- [ ] Crear NestJS en apps/api
- [ ] Configurar TypeScript
- [ ] Variables de entorno
- [ ] Configurar CORS

#### 2.2 Base de datos
- [ ] Configurar Prisma
- [ ] PostgreSQL local
- [ ] Modelos iniciales (User, Role)
- [ ] Primera migración

#### 2.3 Autenticación
- [ ] Módulo Auth (JWT)
- [ ] POST /auth/login
- [ ] POST /auth/refresh
- [ ] GET /auth/me
- [ ] Guards y @Roles()
- [ ] Roles: ADMIN, INVESTOR

#### 2.4 Documentación
- [ ] Swagger configurado

---

### FASE 3: Integración Auth Frontend
**Objetivo:** Conectar login frontend con backend.

- [ ] Página /login
- [ ] Cliente HTTP con interceptores
- [ ] Manejo de tokens
- [ ] Contexto de usuario
- [ ] Protección de rutas
- [ ] Redirección por rol (admin vs investor)

---

### FASE 4: Dashboard Inversionista
**Objetivo:** Panel para inversionistas.

#### Backend
- [ ] GET /me/balance (balance actual)
- [ ] GET /me/transactions (historial)
- [ ] GET /me/loans (préstamos activos)
- [ ] GET /fund/summary (estado del fondo)

#### Frontend
- [ ] Layout dashboard
- [ ] Página /dashboard (resumen)
- [ ] Página /dashboard/transactions
- [ ] Página /dashboard/loans
- [ ] Gráficos de balance

---

### FASE 5: Dashboard Admin
**Objetivo:** Panel de gestión.

#### Backend - Modelos
- [ ] Fund (balance total, fecha inicio)
- [ ] Transaction (tipo, monto, usuario, fecha)
- [ ] Loan (monto, tasa, usuario, estado)
- [ ] SavingsChain (cadena de ahorro)

#### Backend - Endpoints
- [ ] CRUD /admin/users
- [ ] CRUD /admin/transactions
- [ ] CRUD /admin/loans
- [ ] GET /admin/fund
- [ ] POST /admin/fund/distribute (distribuir rendimientos)

#### Frontend
- [ ] /admin/users (lista, crear, editar)
- [ ] /admin/transactions (registrar aportes, retiros)
- [ ] /admin/loans (gestionar préstamos)
- [ ] /admin/fund (estado general)

---

### FASE 6: Lógica Financiera
**Objetivo:** Implementar reglas del negocio.

#### Validaciones
- [ ] Retiros solo al cierre de mes
- [ ] Validar límite de $2M COP sin aviso
- [ ] Validar aviso de 30 días para retiros mayores
- [ ] Calcular intereses (4% socios, 6% no socios)
- [ ] Aplicar sanción automática ($5,000 COP)

#### Cálculos
- [ ] Participación porcentual por inversionista
- [ ] Distribución proporcional de rendimientos
- [ ] Estado de préstamos (capital pendiente, intereses)

#### Reportes
- [ ] Estado de cuenta por inversionista
- [ ] Reporte general del fondo
- [ ] Exportación PDF

---

### FASE 7: Despliegue
**Objetivo:** Producción en AWS Lightsail.
**Documentación detallada:** Ver [DEPLOY.md](./DEPLOY.md)

#### 7.1 Crear cuenta y servidor AWS
- [ ] Crear cuenta en AWS
- [ ] Crear instancia Lightsail (Ubuntu 22.04, $10/mes)
- [ ] Asignar IP estática
- [ ] Configurar firewall (puertos 22, 80, 443, 3000, 4000)

#### 7.2 Configurar dominio
- [ ] Configurar DNS en GoDaddy (A records)
- [ ] sansecapital.co → IP estática
- [ ] api.sansecapital.co → IP estática

#### 7.3 Configurar servidor
- [ ] Instalar Node.js 20, PM2, Nginx, Git
- [ ] Clonar repositorio
- [ ] Compilar y desplegar Next.js
- [ ] Configurar Nginx como proxy reverso

#### 7.4 SSL y seguridad
- [ ] Instalar Certbot
- [ ] Configurar certificados SSL (Let's Encrypt)
- [ ] Verificar HTTPS funcionando

#### 7.5 Backend y BD (futuro)
- [ ] Instalar PostgreSQL
- [ ] Desplegar NestJS con PM2
- [ ] Variables de entorno producción

---

## Progreso

| Fase | Descripción | Estado | Progreso |
|------|-------------|--------|----------|
| 1 | Migración Frontend | Completada | 100% |
| 2 | Setup Backend | No iniciada | 0% |
| 3 | Integración Auth | No iniciada | 0% |
| 4 | Dashboard Inversionista | No iniciada | 0% |
| 5 | Dashboard Admin | No iniciada | 0% |
| 6 | Lógica Financiera | No iniciada | 0% |
| 7 | Despliegue | No iniciada | 0% |

---

## Decisiones Tomadas

| Fecha | Decisión | Razón |
|-------|----------|-------|
| 2026-01-18 | Monorepo (1 repo, 2 apps) | Más simple para equipo pequeño |
| 2026-01-18 | Frontend: Next.js 14 | Estabilidad, documentación, SEO |
| 2026-01-18 | Backend: NestJS separado | Lógica financiera compleja |
| 2026-01-18 | PostgreSQL | ACID compliance para datos financieros |
| 2026-01-18 | Color principal: Negro | Según branding actual |

---

## Equipo del Proyecto

| Rol | Nombre |
|-----|--------|
| Cliente / Admin | Diego |
| Fundador | Sebastián Fandiño |
| Asistente de desarrollo | Atenea (Claude) |

---

## Enlaces

| Recurso | URL |
|---------|-----|
| Repositorio | git@github.com:Fidiestro/sanse.git |
| Dominio | sansecapital.co |
| Twitter/X | https://x.com/sansecapital |
| Instagram | https://www.instagram.com/sansecapital |
| Guía de despliegue | [DEPLOY.md](./DEPLOY.md) |
