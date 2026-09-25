# Transporte Chambatina — auditoría y arquitectura objetivo

## Objetivo
Convertir el proyecto actual en un sistema operativo de despacho y seguimiento, manteniendo producción intacta hasta validación.

## Hallazgos críticos

1. El repositorio es público y existía un archivo `.env` versionado. Deben rotarse las credenciales que hayan estado dentro, aunque el archivo se elimine de la rama actual.
2. La base de datos original solo modelaba `User` y `Post`; no representaba operaciones de transporte.
3. La interfaz principal está concentrada en un único archivo de gran tamaño y corresponde a una web comercial, no a un TMS.
4. La base era SQLite; para operación multiusuario, GPS, auditoría y crecimiento se establece PostgreSQL como destino.
5. No existe todavía control operativo integral de rutas, paradas, POD, incidencias ni telemetría.

## Arquitectura objetivo

- Next.js + TypeScript
- PostgreSQL + Prisma
- Google Maps Platform
  - Maps JavaScript API
  - Routes API
  - Places API (New)
  - Geocoding API cuando sea necesario
- GPS móvil del conductor
- actualizaciones en tiempo real por WebSocket/SSE
- almacenamiento de fotos/firmas fuera de la base de datos; guardar solo URLs
- autenticación con roles
- bitácora de auditoría inmutable a nivel de aplicación

## Módulos

### 1. Centro de despacho
- mapa en vivo de conductores
- rutas del día
- paradas pendientes/completadas
- excepciones y retrasos
- reasignación de conductor/vehículo
- ETA y progreso

### 2. Conductor
- ruta asignada
- navegación a la siguiente parada
- cambio de estado
- escaneo QR/barcode
- foto/firma
- captura GPS/hora
- incidencia con evidencia

### 3. Clientes y envíos
- cliente/remitente/destinatario
- paquetes y tracking codes
- peso/piezas
- asociación a envío/ruta/parada
- historial de estados

### 4. Flota
- conductor
- vehículo
- disponibilidad
- capacidad
- mantenimiento / fuera de servicio

### 5. Auditoría
Registrar:
- creación y edición de rutas
- reasignaciones
- cambios de estado
- entregas
- incidencias
- cambios administrativos sensibles

## Estados base

Paquete:
RECEIVED -> READY_FOR_ROUTE -> IN_TRANSIT -> OUT_FOR_DELIVERY -> DELIVERED

Ruta:
PLANNED -> ASSIGNED -> IN_PROGRESS -> COMPLETED

Parada:
PENDING -> ARRIVED -> COMPLETED

Las excepciones usan estados y registros separados para no destruir el historial.

## Reglas de seguridad

- No exponer claves de Google en repositorio.
- Clave web de Google Maps restringida por dominio.
- Clave servidor restringida por API/IP o entorno.
- Nunca guardar secretos en variables NEXT_PUBLIC_* excepto claves diseñadas para navegador y restringidas.
- No guardar números de licencia completos en logs.
- URLs de evidencia deben ser privadas o firmadas.
- Aplicar rate limiting a GPS y endpoints públicos.
- Validar coordenadas, transiciones de estado y pertenencia de ruta.
- Mantener auditoría de acciones administrativas.

## Índices principales

- route.serviceDate
- route.status
- route.driverId
- route.vehicleId
- gps(routeId, capturedAt)
- package.trackingCode
- package.status
- stop(routeId, sequence)
- incident(resolved, severity)

## Fases

### Fase A — núcleo seguro
- PostgreSQL
- esquema operativo
- autenticación/roles
- seed de prueba
- entorno staging

### Fase B — despacho
- dashboard
- CRUD rutas/paradas
- asignación conductor/vehículo
- mapa

### Fase C — conductor
- vista móvil
- GPS
- escaneo
- POD
- incidencias

### Fase D — tiempo real y optimización
- live map
- ETA
- Routes API
- alertas por atraso/desvío
- métricas

### Fase E — integración
- conectar con plataforma principal Chambatina mediante API interna segura
- no mezclar la lógica de tracking Cuba con la lógica de transporte local sin una capa de integración

## Criterios antes de producción

- migraciones probadas en base staging
- build/lint/tests verdes
- claves rotadas y restringidas
- validación de roles
- pruebas de ruta completa: asignar -> salir -> llegar -> POD -> completar
- pruebas de pérdida de GPS / reconexión
- prueba de idempotencia para eventos duplicados
- revisión de privacidad de fotos, firmas y ubicación
- backup/restore de PostgreSQL comprobado
- aprobación manual antes de merge/deploy
