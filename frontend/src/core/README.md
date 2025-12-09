# Core Module

Core application infrastructure and setup.

## Structure

- `api/` - API client setup
  - `client.ts` - Axios instance with interceptors
  - `endpoints.ts` - API endpoint constants
- `store/` - Global Zustand stores
  - `authStore.ts` - Authentication state
  - `appStore.ts` - Global app state
- `routes/` - Routing configuration
  - `AppRoutes.tsx` - Route definitions
  - `guards.tsx` - Route guards (role-based, auth)
- `layouts/` - Layout wrappers
  - `AuthLayout.tsx` - Layout for auth pages
  - `MaleLayout.tsx` - Layout for male user pages
  - `FemaleLayout.tsx` - Layout for female user pages
  - `AdminLayout.tsx` - Layout for admin pages
- `providers/` - React context providers
  - `ThemeProvider.tsx` - Theme context
  - `SocketProvider.tsx` - Socket.IO context
  - `AuthProvider.tsx` - Auth context (if needed)

## Responsibilities

- Application initialization
- Global state management
- Route protection and navigation
- API client configuration
- Provider setup
- Error boundaries

