# ChatFlow Frontend 🚀

Real estate lead management platform and real-time chat designed to optimize communication between agents and prospects.

## 🏗️ Architecture Overview

The project is built with **Next.js 15 (App Router)** following a modular structure oriented towards **domains/features**.

- **`src/app`**: Definition of global routes and layouts.
- **`src/features`**: Independent modules by functionality (`auth`, `chat`, `dashboard`, `projects`). Each encapsulates its own components, hooks, and view logic.
- **`src/shared`**: Cross-cutting infrastructure layer.
  - **`api`**: REST services (Axios), data hooks (TanStack Query), and domain types.
  - **`context`**: Global state providers (Authentication, QueryClient).
  - **`hooks`**: Shared utilities such as WebSocket handling and debouncing.
  - **`lib`**: External library configurations (Amplify, Axios).

## 🛠️ Backend Services

Communication with the backend is centralized in service classes:

1.  **`ConversationsService`**: Management of chat threads, conversation lists, and summary generation.
2.  **`DashboardService`**: Retrieval of aggregated metrics (total leads, unread messages, etc.).
3.  **`ProjectsService`**: Catalog of available real estate projects.
4.  **`UsersService`**: Management of the authenticated agent's profile.

## 🧠 AI Logic (Smart Summary)

The platform includes a **smart summary** feature.

- Located in `ConversationsService.getSummary`.
- Allows agents to obtain a quick synthesis of long conversations, facilitating prospect follow-up without reading the entire history.
- Implemented via a React Query mutation (`useGenerateSummary`) for loading state management.

## 📡 Key Decisions and Trade-offs

- **Native WebSockets vs socket.io**: A native WebSocket implementation was chosen to reduce bundle size and avoid the overhead of heavy libraries, maintaining the minimum latency required for chat.
- **TanStack Query for Data State**: Used to synchronize server state. This avoids the need for Redux/Zustand for data coming from the API, delegating caching and invalidation to a specialized library.
- **AWS Amplify Auth**: Centralization of identity through Cognito, allowing secure token and session management with minimal manual logic.
- **Cache Clearing**: In `AuthContext`, a forced clearing of the QueryClient cache was implemented upon logout to ensure no sensitive data remains visible between sessions.

## 🌍 Private Routes (Require authentication)

- `/dashboard`: Main dashboard with conversation listing.
- `/chat`: Conversation list.

## 🌍 Public Routes (Do not require authentication)

- `/`: Redirection to `/login`.
- `/login`: Login page.
- `/projects`: Catalog of available real estate projects.

## ⚙️ Configuration and Implementation

### Environment Variables (`.env`)

The project requires the following variables:

```bash
NEXT_PUBLIC_API_URL=              # REST API Base URL
NEXT_PUBLIC_WEBSOCKET_URL=        # WebSocket Gateway URL
NEXT_PUBLIC_COGNITO_USER_POOL_ID= # Cognito Pool ID
NEXT_PUBLIC_COGNITO_CLIENT_ID=    # Cognito Client ID
```

### Execution

```bash
yarn install    # Install dependencies
yarn dev        # Development server
yarn build      # Production optimization
```

## 📝 Implementation Notes

- The `ChatWindow` component blocks message sending if the user's role is not appropriate (e.g., Admin vs Agent).
- WebSockets automatically reconnect based on the user's authentication status (`shouldConnect: !!user`).
- Each agent has their own conversation list, which updates in real-time via WebSockets.

## 🚀 Features

- `auth`: Authentication and authorization management.
- `chat`: Conversation and real-time chat management.
- `dashboard`: Main dashboard with conversation listing.
- `projects`: Catalog of available real estate projects.
