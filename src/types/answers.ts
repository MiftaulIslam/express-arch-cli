export type Database = 'postgres' | 'mysql' | 'mongodb';
export type Orm = 'drizzle' | 'prisma' | 'typeorm' | 'mongoose';
export type Logger = 'none' | 'pino' | 'winston';
export type Validator = 'none' | 'zod' | 'yup';
export type PackageManager = 'npm' | 'pnpm' | 'yarn';
export type ArchitectureType =
  | 'modular-monolith'
  | 'clean-architecture'
  | 'hexagonal'
  | 'mvc';
export type PatternType =
  | 'repository'
  | 'service'
  | 'controller'
  | 'specification'
  | 'unit-of-work'
  | 'dependency-injection'
  | 'factory';
export type ArchitectureVariant =
  | 'mvc-classic'
  | 'clean-layer-first'
  | 'clean-feature-first'
  | 'hexagonal-feature-first'
  | 'hexagonal-layer-grouped'
  | 'modular-simple'
  | 'modular-internal-clean';
export type ArchitecturePresetId =
  | 'modular-monolith-layered-repository-service'
  | 'clean-architecture-repository-unit-of-work'
  | 'hexagonal-repository-dependency-injection'
  | 'mvc-service-repository';

export interface CliAnswers {
  projectName: string;
  useArchitecturePreset: boolean;
  architecturePreset?: ArchitecturePresetId;
  architecture?: ArchitectureType;
  architectureVariant?: ArchitectureVariant;
  patterns?: PatternType[];
  database: Database;
  orm: Orm;
  logger: Logger;
  validator: Validator;
  swagger: boolean;
  packageManager: PackageManager;
  installDependencies: boolean;
  initializeGit: boolean;
  includeExampleModule: boolean;
}

export interface ResolvedArchitectureConfig {
  architecture: ArchitectureType;
  variant: ArchitectureVariant;
  patterns: PatternType[];
  presetId?: ArchitecturePresetId;
  displayName: string;
  templateKeys: string[];
}