# express-arch-cli
Create scalable backend blueprint in seconds.
Supports:
- Clean Architecture
- Hexagonal Architecture
- Modular Monolith
- MVC
- DB + ORM

A CLI tool to quickly create Express + TypeScript backend applications with architecture-aware scaffolding and interactive customization.

## Features

- 🚀 Quick project setup with interactive prompts
- 🧱 Real architecture-driven output (not label-only templates)
- 🧩 Pattern-aware generation with compatibility validation
- 📁 Well-organized generated structure per architecture variant
- 📝 TypeScript support out of the box
- 🗄️ Multiple DB + ORM/ODM combinations
- 📊 Logging support (`none`, `pino`, `winston`)
- ✅ Validation support (`none`, `zod`, `yup`)
- 📚 Optional Swagger/OpenAPI integration
- ⚙️ Package manager choice (`npm`, `pnpm`, `yarn`)
- 🔧 Optional install dependencies + git init
- 🧪 Optional example module aligned to selected architecture

## Installation

### Global installation

```bash
npm install -g express-arch-cli
```

### Local usage (npx)

```bash
npx express-arch-cli
```

## Usage

### Basic usage

```bash
express-arch-cli
```

or

```bash
npx express-arch-cli
```

The CLI will prompt for:

- project name
- architecture preset or custom mode
- architecture and variant (custom mode)
- compatible patterns
- database + orm/odm
- logger
- validation library
- swagger
- package manager
- install dependencies now
- initialize git
- include example module

## Architecture Support

### Architectures

- `mvc`
- `clean-architecture`
- `hexagonal`
- `modular-monolith`

### Variants (sub-architectures)

- MVC:
  - `mvc-classic`
- Clean Architecture:
  - `clean-layer-first`
  - `clean-feature-first`
- Hexagonal Architecture:
  - `hexagonal-feature-first`
  - `hexagonal-layer-grouped`
- Modular Monolith:
  - `modular-simple`
  - `modular-internal-clean`

### Built-in presets

- `modular-monolith-layered-repository-service`
- `clean-architecture-repository-unit-of-work`
- `hexagonal-repository-dependency-injection`
- `mvc-service-repository`

## Pattern Support

Supported patterns:

- `repository`
- `service`
- `controller`
- `specification`
- `unit-of-work`
- `dependency-injection`
- `factory`

Validation rules:

- `specification` requires `repository`
- `unit-of-work` requires `repository`
- invalid combinations are blocked in the prompt flow

Architecture compatibility:

- MVC: `repository`, `service`, `controller`, `dependency-injection`, `factory`
- Clean Architecture: all patterns above
- Hexagonal Architecture: all patterns above
- Modular Monolith: all patterns above

## Database + ORM/ODM Matrix

- PostgreSQL:
  - Drizzle
  - Prisma
  - TypeORM
- MySQL:
  - Drizzle
  - Prisma
  - TypeORM
- MongoDB:
  - Mongoose

## Logging, Validation, and API Docs

- Logger: `none`, `pino`, `winston`
- Validation: `none`, `zod`, `yup`
- Optional Swagger/OpenAPI: enabled via prompt

## How it Works

The generator resolves templates in this order:

1. `base`
2. architecture core
3. architecture variant core
4. preset overlay (if selected)
5. pattern overlays
6. architecture sample (where applicable)
7. architecture variant sample
8. db/orm
9. logger
10. validator
11. swagger

This keeps architecture, naming, imports, and wiring consistent with your selected setup.

## Example Generated Structures

### MVC (classic)

```text
src/
  app/
  controllers/
  models/
  routes/
  services/
  repositories/
  validators/
  config/
  middlewares/
  index.ts
```

### Clean Architecture (layer-first)

```text
src/
  domain/
  application/
  infrastructure/
  presentation/
  app/
  config/
  index.ts
```

### Hexagonal (feature-first)

```text
src/
  modules/
    sample/
      domain/
      application/
      ports/
      adapters/
  app/
  config/
  index.ts
```

### Modular Monolith (internal clean)

```text
src/
  modules/
    sample/
      domain/
      application/
      infrastructure/
      presentation/
  shared/
  app/
  config/
  index.ts
```

## Local Development

```bash
npm install
npm run build
npm run dev
```

## Package Structure

- `src/prompts` interactive prompt flow
- `src/architecture` architecture/variant compatibility and resolution
- `src/constants` option definitions
- `src/generator` generation pipeline and template resolver
- `src/templates` base + architecture + variant + pattern + stack overlays
- `src/types` typed CLI answer and resolved models
- `src/utils` shared utilities

## Publish

```bash
npm run build
npm publish --access public
```
## ⚠️ Early Stage Notice

> This project is currently in an early stage of development.

You may encounter bugs, incomplete features, or occasional errors especially after scaffolding and running a newly generated project. This is expected as the tool is still evolving.

If you face any issues:

- Please report them via GitHub Issues  
- Include steps to reproduce if possible  

Your feedback and support play a big role in improving this tool and making it production-ready.

👉 Open an issue here [here](https://github.com/MiftaulIslam/express-arch-cli/issues)



## Contributing
- Fork the repository
- Create your feature branch (git checkout -b feature/amazing-feature)
- Commit your changes (git commit -m 'Add some amazing feature')
- Push to the branch (git push origin feature/amazing-feature)
- Open a Pull Request

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/MiftaulIslam/express-arch-cli/issues) on GitHub
