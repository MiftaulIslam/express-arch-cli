# Architecture Overview

This project follows `MVC` for API backends.

## Style

- Flatter module folders.
- Controllers orchestrate request/response.
- Services encapsulate business logic.
- Repositories or model/schema files handle persistence details.

## Request Flow

Route -> Controller -> Service -> Repository/Model
