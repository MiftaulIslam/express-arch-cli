# Architecture Overview

This project follows `Clean Architecture`.

## Layers

- `domain`: entities and business contracts.
- `application`: use-cases and application services.
- `infrastructure`: persistence and external implementations.
- `presentation`: http adapters (controllers/routes/validators).

## Request Flow

HTTP Route -> Presentation Controller -> Application Use Case -> Domain Contract -> Infrastructure Repository

## Dependency Rule

Dependencies point inward toward domain and application.
Outer layers implement contracts defined by inner layers.
