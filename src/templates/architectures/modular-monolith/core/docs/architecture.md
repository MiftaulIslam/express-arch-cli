# Architecture Overview

This project follows a `Modular Monolith` style.

## Why this structure

- One deployable service with module-centric boundaries.
- Each module keeps its own route/controller/service/repository files.
- Shared concerns remain in `src/common`, `src/config`, and `src/middlewares`.

## Request Flow

Route -> Controller -> Service -> Repository

## Dependency Direction

Dependencies are layered inward within each module.
Persistence details remain in repositories and db templates.
