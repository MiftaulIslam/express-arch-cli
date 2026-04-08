# Architecture Overview

This project follows `{{architectureDisplayName}}`.
Variant: `{{architectureVariant}}`.

## Selected Patterns

{{architecturePatterns}}

## Folder Intent

- `src/modules` contains the business modules.
- Internal module structure is architecture-driven (layered, clean, hexagonal, or mvc style).
- `src/config` and `src/common` hold cross-cutting concerns and shared utilities.

## Request Flow Example

HTTP Route -> Controller/Adapter -> Service/Use Case/Core -> Repository Port/Contract -> Persistence Adapter

## Dependency Direction

Dependencies should point toward business logic.
Framework and database details stay in outer layers/adapters.

## Business/Persistence/Validation Location

- Business logic: service/use-cases/core module directories.
- Persistence logic: repository implementations/adapters/infrastructure folders.
- Validation logic: route/controller adapter level validation files.
- Unit of Work note: {{architectureUnitOfWorkNote}}