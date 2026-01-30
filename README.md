# ChatFlow Frontend 🚀

Plataforma de gestión de leads inmobiliarios y chat en tiempo real diseñada para optimizar la comunicación entre agentes y prospectos.

## 🏗️ Resumen de la Arquitectura

El proyecto está construido con **Next.js 15 (App Router)** siguiendo una estructura modular orientada a **dominios/features**.

- **`src/app`**: Definición de rutas y layouts globales.
- **`src/features`**: Módulos independientes por funcionalidad (`auth`, `chat`, `dashboard`, `projects`). Cada uno encapsula sus propios componentes, hooks y lógica de vista.
- **`src/shared`**: Capa de infraestructura transversal.
  - **`api`**: Servicios REST (Axios), hooks de datos (TanStack Query) y tipos de dominio.
  - **`context`**: Proveedores de estado global (Autenticación, QueryClient).
  - **`hooks`**: Utilidades compartidas como el manejo de WebSockets y debouncing.
  - **`lib`**: Configuraciones de librerías externas (Amplify, Axios).

## 🛠️ Servicios del Backend

La comunicación con el backend está centralizada en clases de servicios:

1.  **`ConversationsService`**: Gestión de hilos de chat, lista de conversaciones y generación de resúmenes.
2.  **`DashboardService`**: Obtención de métricas agregadas ( leads totales, mensajes sin leer, etc.).
3.  **`ProjectsService`**: Catálogo de proyectos inmobiliarios disponibles.
4.  **`UsersService`**: Gestión del perfil del agente autenticado.

## 🧠 Lógica de IA (Smart Summary)

La plataforma incluye una funcionalidad de **resumen inteligente**.

- Localizada en `ConversationsService.getSummary`.
- Permite a los agentes obtener una síntesis rápida de conversaciones largas, facilitando el seguimiento de prospectos sin leer todo el historial.
- Implementado mediante una mutación de React Query (`useGenerateSummary`) para manejo de estados de carga.

## 📡 Decisiones Clave y Compensaciones (Trade-offs)

- **WebSockets Nativos vs socket.io**: Se optó por una implementación nativa de WebSockets para reducir el tamaño del bundle y evitar la sobrecarga de librerías pesadas, manteniendo la latencia mínima necesaria para chat.
- **TanStack Query para Estado de Datos**: Se utiliza para sincronizar el estado del servidor. Esto evita la necesidad de Redux/Zustand para datos que provienen de la API, delegando el cacheo y la invalidación a una librería especializada.
- **AWS Amplify Auth**: Centralización de la identidad a través de Cognito, permitiendo un manejo seguro de tokens y sesiones con mínima lógica manual.
- **Limpieza de Caché**: En el `AuthContext`, se implementó el vaciado forzado de la caché de QueryClient al hacer logout para garantizar que no queden datos sensibles visibles entre sesiones.

## 🌍 Rutas Privadas (Requieren autenticación)

- `/dashboard`: Dashboard principal con listado de conversaciones.
- `/chat`: Lista de conversaciones.

## 🌍 Rutas Públicas (No requieren autenticación)

- `/`: Redirección a `/login`.
- `/login`: Página de inicio de sesión.
- `/projects`: Catálogo de proyectos inmobiliarios disponibles.

## ⚙️ Configuración e Implementación

### Variables de Entorno (`.env`)

El proyecto requiere las siguientes variables:

```bash
NEXT_PUBLIC_API_URL=              # Base URL de la API REST
NEXT_PUBLIC_WEBSOCKET_URL=        # URL del Gateway de WebSockets
NEXT_PUBLIC_COGNITO_USER_POOL_ID= # ID del Pool de Cognito
NEXT_PUBLIC_COGNITO_CLIENT_ID=    # ID del Cliente de Cognito
```

### Ejecución

```bash
yarn install    # Instalar dependencias
yarn dev        # Servidor de desarrollo
yarn build      # Optimización para producción
```

## 📝 Notas de Implementación

- El componente `ChatWindow` bloquea el envío de mensajes si el rol del usuario no es el adecuado (ej. Admin vs Agente).
- Los WebSockets se reconectan automáticamente basándose en el estado de autenticación del usuario (`shouldConnect: !!user`).
- Cada agente tiene su propia lista de conversaciones, que se actualiza en tiempo real a través de WebSockets.

## 🚀 Features

- `auth`: Gestión de autenticación y autorización.
- `chat`: Gestión de conversaciones y chat en tiempo real.
- `dashboard`: Dashboard principal con listado de conversaciones.
- `projects`: Catálogo de proyectos inmobiliarios disponibles.
