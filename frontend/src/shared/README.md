# Shared Module

Reusable components, utilities, and resources shared across all features.

## Structure

- `components/ui/` - Base UI components (Button, Input, Modal, Card, Avatar, Badge, LoadingSpinner, etc.)
- `components/layout/` - Layout components (Header, Footer, Sidebar, Navigation, etc.)
- `hooks/` - Shared React hooks (useGeolocation, useDebounce, useLocalStorage, etc.)
- `utils/` - Utility functions
  - `formatters.ts` - Date, currency, number formatters
  - `validators.ts` - Zod validation schemas
  - `helpers.ts` - General helper functions
- `types/` - Shared TypeScript types/interfaces
- `constants/` - App-wide constants
- `config/` - Configuration files

## Usage

Import from shared using path alias:
```typescript
import { Button } from '@shared/components/ui/Button'
import { formatCurrency } from '@shared/utils/formatters'
import { APP_NAME } from '@shared/constants'
```

