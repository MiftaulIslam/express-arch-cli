# Architecture Overview

This project follows `Hexagonal Architecture` (Ports and Adapters).

## Main Concepts

- Core domain logic remains framework-agnostic.
- Input ports define use-cases.
- Output ports define persistence/external contracts.
- Adapters implement delivery (HTTP) and persistence concerns.

## Request Flow

HTTP Adapter -> Input Port Use Case -> Output Port -> Persistence Adapter

## Dependency Rule

Adapters depend on ports and core models, never the other way around.
