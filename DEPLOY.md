# Guía de Despliegue - Sanse Capital

## Resumen

| Elemento | Valor |
|----------|-------|
| **Proveedor** | AWS Lightsail |
| **Instancia** | Ubuntu 22.04, 2GB RAM, 1 vCPU ($10/mes) |
| **Dominio** | sansecapital.co (GoDaddy) |
| **SSL** | Let's Encrypt (gratis) |

---

## Arquitectura Final

```
Internet
    │
    ▼
┌─────────────────────────────────────────┐
│           sansecapital.co               │
│              (GoDaddy)                  │
└─────────────────┬───────────────────────┘
                  │ DNS apunta a IP estática
                  ▼
┌─────────────────────────────────────────┐
│         AWS Lightsail                   │
│         IP: xxx.xxx.xxx.xxx             │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │            Nginx                  │  │
│  │     (Puerto 80/443 + SSL)         │  │
│  └──────────────┬────────────────────┘  │
│                 │                       │
│     ┌───────────┴───────────┐           │
│     │                       │           │
│     ▼                       ▼           │
│  ┌──────────┐         ┌──────────┐      │
│  │ Next.js  │         │ NestJS   │      │
│  │ :3000    │         │ :4000    │      │
│  │ (PM2)    │         │ (PM2)    │      │
│  └──────────┘         └──────────┘      │
│                             │           │
│                             ▼           │
│                       ┌──────────┐      │
│                       │PostgreSQL│      │
│                       │ :5432    │      │
│                       └──────────┘      │
└─────────────────────────────────────────┘
```

---

## FASE 1: Crear Cuenta AWS

### 1.1 Registro
- [ ] Ir a https://aws.amazon.com
- [ ] Click en "Crear cuenta de AWS"
- [ ] Ingresar email y datos
- [ ] Agregar método de pago (tarjeta de crédito/débito)
- [ ] Verificar identidad (código SMS)
- [ ] Seleccionar plan "Basic Support" (gratis)

### 1.2 Acceder a Lightsail
- [ ] Iniciar sesión en AWS Console
- [ ] Buscar "Lightsail" en la barra de búsqueda
- [ ] Click en "Lightsail"

---

## FASE 2: Crear Instancia Lightsail

### 2.1 Crear instancia
- [ ] Click en "Create instance"
- [ ] **Region:** Seleccionar la más cercana (ej: N. Virginia o São Paulo)
- [ ] **Platform:** Linux/Unix
- [ ] **Blueprint:** OS Only → Ubuntu 22.04 LTS
- [ ] **Plan:** $10 USD/mes (2 GB RAM, 1 vCPU, 60 GB SSD)
- [ ] **Instance name:** `sanse-production`
- [ ] Click en "Create instance"
- [ ] Esperar ~2 minutos a que inicie

### 2.2 Asignar IP estática
- [ ] En Lightsail, ir a "Networking"
- [ ] Click en "Create static IP"
- [ ] **Name:** `sanse-ip`
- [ ] **Attach to instance:** `sanse-production`
- [ ] Click en "Create"
- [ ] **Anotar la IP:** `___.___.___.___ `

### 2.3 Configurar Firewall
- [ ] Click en tu instancia `sanse-production`
- [ ] Ir a pestaña "Networking"
- [ ] En "IPv4 Firewall", verificar que estén estos puertos:

| Aplicación | Protocolo | Puerto |
|------------|-----------|--------|
| SSH | TCP | 22 |
| HTTP | TCP | 80 |
| HTTPS | TCP | 443 |
| Custom (Next.js) | TCP | 3000 |
| Custom (NestJS) | TCP | 4000 |

---

## FASE 3: Configurar Dominio

### 3.1 En GoDaddy (donde tienes el dominio)
- [ ] Ir a https://godaddy.com → Mis productos → DNS
- [ ] Editar registros DNS:

| Tipo | Nombre | Valor | TTL |
|------|--------|-------|-----|
| A | @ | `TU_IP_ESTATICA` | 600 |
| A | www | `TU_IP_ESTATICA` | 600 |
| A | api | `TU_IP_ESTATICA` | 600 |

### 3.2 Verificar propagación
- [ ] Esperar 5-30 minutos
- [ ] Verificar en https://dnschecker.org buscando `sansecapital.co`

---

## FASE 4: Configurar Servidor

### 4.1 Conectar al servidor
```bash
# Opción 1: Desde Lightsail
# Click en el icono de terminal en tu instancia

# Opción 2: Desde tu PC (necesitas descargar la llave SSH)
ssh -i tu-llave.pem ubuntu@TU_IP_ESTATICA
```

### 4.2 Actualizar sistema
```bash
sudo apt update && sudo apt upgrade -y
```

### 4.3 Instalar Node.js 20
```bash
# Instalar nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc

# Instalar Node.js 20
nvm install 20
nvm use 20
nvm alias default 20

# Verificar
node --version  # Debe mostrar v20.x.x
npm --version
```

### 4.4 Instalar PM2 (gestor de procesos)
```bash
npm install -g pm2
```

### 4.5 Instalar Nginx
```bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 4.6 Instalar Git
```bash
sudo apt install git -y
```

---

## FASE 5: Desplegar Next.js

### 5.1 Clonar repositorio
```bash
cd ~
git clone git@github.com:Fidiestro/sanse.git
cd sanse
```

### 5.2 Configurar SSH para GitHub (si es privado)
```bash
# Generar llave SSH
ssh-keygen -t ed25519 -C "tu-email@ejemplo.com"

# Mostrar llave pública
cat ~/.ssh/id_ed25519.pub

# Copiar y agregar en GitHub → Settings → SSH Keys
```

### 5.3 Instalar dependencias y compilar
```bash
cd ~/sanse
npm install
npm run build:web
```

### 5.4 Iniciar con PM2
```bash
cd ~/sanse/apps/web
pm2 start npm --name "sanse-web" -- start
pm2 save
pm2 startup  # Seguir las instrucciones que muestre
```

### 5.5 Verificar que funciona
```bash
pm2 status
curl http://localhost:3000  # Debe mostrar HTML
```

---

## FASE 6: Configurar Nginx

### 6.1 Crear configuración
```bash
sudo nano /etc/nginx/sites-available/sansecapital.co
```

### 6.2 Contenido del archivo
```nginx
server {
    listen 80;
    server_name sansecapital.co www.sansecapital.co;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Para el backend (cuando lo tengas)
server {
    listen 80;
    server_name api.sansecapital.co;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 6.3 Activar configuración
```bash
sudo ln -s /etc/nginx/sites-available/sansecapital.co /etc/nginx/sites-enabled/
sudo nginx -t  # Verificar sintaxis
sudo systemctl reload nginx
```

---

## FASE 7: Configurar SSL (HTTPS)

### 7.1 Instalar Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 7.2 Obtener certificado
```bash
sudo certbot --nginx -d sansecapital.co -d www.sansecapital.co -d api.sansecapital.co
```

### 7.3 Seguir instrucciones
- Ingresar email
- Aceptar términos
- Elegir redirigir HTTP a HTTPS (opción 2)

### 7.4 Verificar renovación automática
```bash
sudo certbot renew --dry-run
```

---

## FASE 8: Verificación Final

### 8.1 Checklist
- [ ] Abrir https://sansecapital.co en el navegador
- [ ] Verificar que carga la landing
- [ ] Verificar el candado de SSL (HTTPS)
- [ ] Probar navegación responsive (móvil)
- [ ] Verificar favicon

### 8.2 Comandos útiles
```bash
# Ver estado de la app
pm2 status

# Ver logs
pm2 logs sanse-web

# Reiniciar app
pm2 restart sanse-web

# Ver estado de Nginx
sudo systemctl status nginx

# Reiniciar Nginx
sudo systemctl restart nginx
```

---

## FASE FUTURA: Agregar Backend y BD

### Instalar PostgreSQL
```bash
sudo apt install postgresql postgresql-contrib -y
sudo systemctl enable postgresql

# Crear usuario y base de datos
sudo -u postgres psql
CREATE USER sanse WITH PASSWORD 'tu_password_seguro';
CREATE DATABASE sanse_db OWNER sanse;
\q
```

### Desplegar NestJS
```bash
cd ~/sanse
npm run build:api

cd apps/api
pm2 start dist/main.js --name "sanse-api"
pm2 save
```

---

## Troubleshooting

### La página no carga
```bash
# Verificar que Next.js está corriendo
pm2 status

# Ver logs de errores
pm2 logs sanse-web --err

# Verificar Nginx
sudo nginx -t
sudo systemctl status nginx
```

### Error de permisos
```bash
# Si hay error de permisos con npm
sudo chown -R $USER:$USER ~/.npm
sudo chown -R $USER:$USER ~/sanse
```

### Puerto ya en uso
```bash
# Ver qué proceso usa el puerto
sudo lsof -i :3000
# Matar proceso si es necesario
kill -9 PID
```

---

## Costos Mensuales Estimados

| Servicio | Costo |
|----------|-------|
| Lightsail ($10 plan) | $10.00 |
| IP estática | $0.00 (incluida) |
| SSL (Let's Encrypt) | $0.00 |
| Dominio (GoDaddy) | ~$12/año |
| **Total mensual** | **~$11.00** |

---

## Contacto de Soporte AWS

- Documentación: https://docs.aws.amazon.com/lightsail/
- Foro: https://repost.aws/tags/TAcdwOXLfgQySuT5UIj1SCOQ/amazon-lightsail

---

*Última actualización: 2026-01-18*
