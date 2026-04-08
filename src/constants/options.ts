import type { ArchitecturePresetId, ArchitectureType, PatternType } from '../types/answers.js';

export const DATABASE_OPTIONS = [
  { name: 'PostgreSQL', value: 'postgres' },
  { name: 'MySQL', value: 'mysql' },
  { name: 'MongoDB', value: 'mongodb' }
] as const;

export const ORM_OPTIONS = {
  postgres: [
    { name: 'Drizzle', value: 'drizzle' },
    { name: 'Prisma', value: 'prisma' },
    { name: 'TypeORM', value: 'typeorm' }
  ],
  mysql: [
    { name: 'Drizzle', value: 'drizzle' },
    { name: 'Prisma', value: 'prisma' },
    { name: 'TypeORM', value: 'typeorm' }
  ],
  mongodb: [{ name: 'Mongoose', value: 'mongoose' }]
} as const;

export const LOGGER_OPTIONS = [
  { name: 'None', value: 'none' },
  { name: 'Pino', value: 'pino' },
  { name: 'Winston', value: 'winston' }
] as const;

export const VALIDATOR_OPTIONS = [
  { name: 'None', value: 'none' },
  { name: 'Zod', value: 'zod' },
  { name: 'Yup', value: 'yup' }
] as const;

export const PACKAGE_MANAGER_OPTIONS = [
  { name: 'npm', value: 'npm' },
  { name: 'pnpm', value: 'pnpm' },
  { name: 'yarn', value: 'yarn' }
] as const;

export const ARCHITECTURE_PRESET_OPTIONS: ReadonlyArray<{
  name: string;
  value: ArchitecturePresetId;
}> = [
  {
    name: 'Modular Monolith + Layered + Repository + Service',
    value: 'modular-monolith-layered-repository-service'
  },
  {
    name: 'Clean Architecture + Repository + Unit of Work',
    value: 'clean-architecture-repository-unit-of-work'
  },
  {
    name: 'Hexagonal + Repository + Dependency Injection',
    value: 'hexagonal-repository-dependency-injection'
  },
  {
    name: 'MVC + Service + Repository',
    value: 'mvc-service-repository'
  }
];

export const ARCHITECTURE_OPTIONS: ReadonlyArray<{ name: string; value: ArchitectureType }> = [
  { name: 'Modular Monolith', value: 'modular-monolith' },
  { name: 'Clean Architecture', value: 'clean-architecture' },
  { name: 'Hexagonal Architecture', value: 'hexagonal' },
  { name: 'MVC', value: 'mvc' }
];

export const PATTERN_OPTIONS: ReadonlyArray<{ name: string; value: PatternType; description: string }> = [
  { name: 'Repository', value: 'repository', description: 'Data access abstraction' },
  { name: 'Service', value: 'service', description: 'Business logic orchestration layer' },
  { name: 'Controller', value: 'controller', description: 'HTTP request handling layer' },
  {
    name: 'Specification',
    value: 'specification',
    description: 'Encapsulated query/filtering rules'
  },
  {
    name: 'Unit of Work',
    value: 'unit-of-work',
    description: 'Transaction boundary abstraction (requires Repository)'
  },
  {
    name: 'Dependency Injection',
    value: 'dependency-injection',
    description: 'Constructor-based dependency wiring'
  },
  { name: 'Factory', value: 'factory', description: 'Creation logic encapsulation' }
];