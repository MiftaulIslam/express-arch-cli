# Clean Architecture (Layer-first)

Top-level layers:
- `domain`
- `application`
- `infrastructure`
- `presentation`

Presentation depends on application, application depends on domain contracts, and infrastructure implements inward interfaces.
