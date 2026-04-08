# {{projectName}}

Scaffolded with `express-arch-cli`.

## Stack

- Node.js + TypeScript + Express
- Database: {{db}}
- ORM/ODM: {{orm}}
- Logger: {{logger}}
- Validator: {{validator}}
- Swagger: {{swagger}}
- Architecture: {{architectureDisplayName}}
- Architecture variant: {{architectureVariant}}

## Scripts

- `npm run dev` Start in watch mode
- `npm run build` Compile to `dist`
- `npm run start` Run compiled server
- `npm run typecheck` Run TS type checks
- `npm run lint` Run ESLint
- `npm run lint:fix` Fix ESLint issues
- `npm run format` Run Prettier

Extra DB scripts are included according to your selected data layer.

## Architecture Summary

- Selected architecture: `{{architecture}}`
- Selected patterns: {{architecturePatterns}}
- Preset: `{{architecturePreset}}`
- See `docs/architecture.md` for dependency flow and module conventions.

## Structure

- `src/app` app bootstrap classes
- `src/config` runtime config (env, db, cors, logger)
- `src/common` shared abstractions and helpers
- `src/modules` business modules (layout varies by architecture)
- `src/middlewares` request pipeline concerns
- `src/routes` route composition
- `docs` architecture notes

## Add New Modules

Create modules by following the same folder boundaries as `src/modules/sample`.
Keep controllers/adapters thin, push business rules into service/use-case/core code, and keep persistence details in repository/adapter layers.