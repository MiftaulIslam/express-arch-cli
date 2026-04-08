import path from 'node:path';
import { resolveArchitectureConfig } from '../architecture/config.js';
import { writeTextFile } from '../utils/file.js';
import { runCommand } from '../utils/package-manager.js';
import type { CliAnswers } from '../types/answers.js';
import { createProjectDirectory } from './create-directories.js';
import { createFilesFromTemplates } from './create-files.js';
import { installDependencies } from './install-dependencies.js';
import { generatePackageJson } from './package-json.js';
import { resolveTemplateDirectories } from './template-resolver.js';

const getSampleValidatorSnippets = (
  validator: CliAnswers['validator']
): {
  schemaImports: string;
  idParamSchema: string;
  listQuerySchema: string;
  createSchema: string;
  updateSchema: string;
  routeImports: string;
  createMiddleware: string;
  updateMiddleware: string;
} => {
  if (validator === 'zod') {
    return {
      schemaImports: "import { z } from 'zod';",
      idParamSchema: "export const sampleIdParamSchema = z.object({\n  id: z.string().min(1)\n});",
      listQuerySchema:
        "export const listSamplesQuerySchema = z.object({\n  page: z.coerce.number().int().positive().default(1),\n  limit: z.coerce.number().int().positive().max(100).default(20),\n  search: z.string().trim().min(1).optional()\n});",
      createSchema:
        "export const createSampleSchema = z.object({\n  name: z.string().min(2).max(80),\n  description: z.string().max(200).optional()\n});",
      updateSchema:
        "export const updateSampleSchema = z\n  .object({\n    name: z.string().min(2).max(80).optional(),\n    description: z.string().max(200).optional()\n  })\n  .refine((value) => Object.keys(value).length > 0, {\n    message: 'At least one field must be provided.'\n  });",
      routeImports: "import { validateWithZod } from '../../middlewares/ValidateMiddleware.js';\nimport { createSampleSchema, updateSampleSchema } from './sample.schema.js';",
      createMiddleware: 'validateWithZod(createSampleSchema),',
      updateMiddleware: 'validateWithZod(updateSampleSchema),'
    };
  }

  if (validator === 'yup') {
    return {
      schemaImports: "import * as yup from 'yup';",
      idParamSchema: "export const sampleIdParamSchema = yup.object({\n  id: yup.string().required().trim().min(1)\n});",
      listQuerySchema:
        "export const listSamplesQuerySchema = yup.object({\n  page: yup\n    .number()\n    .transform((_value, originalValue) => Number(originalValue))\n    .integer()\n    .positive()\n    .default(1),\n  limit: yup\n    .number()\n    .transform((_value, originalValue) => Number(originalValue))\n    .integer()\n    .positive()\n    .max(100)\n    .default(20),\n  search: yup.string().trim().min(1).optional()\n});",
      createSchema:
        "export const createSampleSchema = yup.object({\n  name: yup.string().required().min(2).max(80),\n  description: yup.string().optional().max(200)\n});",
      updateSchema:
        "export const updateSampleSchema = yup\n  .object({\n    name: yup.string().optional().min(2).max(80),\n    description: yup.string().optional().max(200)\n  })\n  .test('has-at-least-one-field', 'At least one field must be provided.', (value) => {\n    return Boolean(value && Object.keys(value).length > 0);\n  });",
      routeImports: "import { validateWithYup } from '../../middlewares/ValidateMiddleware.js';\nimport { createSampleSchema, updateSampleSchema } from './sample.schema.js';",
      createMiddleware: 'validateWithYup(createSampleSchema),',
      updateMiddleware: 'validateWithYup(updateSampleSchema),'
    };
  }

  return {
    schemaImports: '',
    idParamSchema: 'export const sampleIdParamSchema = null;',
    listQuerySchema: 'export const listSamplesQuerySchema = null;',
    createSchema: 'export const createSampleSchema = null;',
    updateSchema: 'export const updateSampleSchema = null;',
    routeImports: '',
    createMiddleware: '',
    updateMiddleware: ''
  };
};

const createTemplateContext = (answers: CliAnswers): Record<string, string> => {
  const resolvedArchitecture = resolveArchitectureConfig(answers);
  const validator = getSampleValidatorSnippets(answers.validator);
  const patternsDisplay = resolvedArchitecture.patterns
    .map((pattern) =>
      pattern
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
    )
    .join(', ');

  const isMongoMongoose = answers.database === 'mongodb' && answers.orm === 'mongoose';
  const unitOfWorkNote =
    isMongoMongoose && resolvedArchitecture.patterns.includes('unit-of-work')
      ? 'Unit of Work is included as a simplified placeholder because MongoDB + Mongoose is not transaction-first in this starter.'
      : 'Unit of Work follows regular transaction boundaries for SQL-first stacks.';

  const sampleSwaggerImport = answers.swagger
    ? "import { sampleOpenApiDoc } from './sample.swagger.js';"
    : '';

  const sampleSwaggerExport = answers.swagger
    ? '  getSwaggerDoc: () => sampleOpenApiDoc'
    : '  getSwaggerDoc: undefined';

  return {
    projectName: answers.projectName,
    db: answers.database,
    orm: answers.orm,
    logger: answers.logger,
    validator: answers.validator,
    architecture: resolvedArchitecture.architecture,
    architectureVariant: resolvedArchitecture.variant,
    architectureDisplayName: resolvedArchitecture.displayName,
    architecturePatterns: patternsDisplay,
    architecturePreset: resolvedArchitecture.presetId ?? 'custom',
    architectureUnitOfWorkNote: unitOfWorkNote,
    swagger: answers.swagger ? 'yes' : 'no',
    sampleSchemaImports: validator.schemaImports,
    sampleIdParamSchema: validator.idParamSchema,
    sampleListQuerySchema: validator.listQuerySchema,
    sampleCreateValidation: validator.createSchema,
    sampleUpdateValidation: validator.updateSchema,
    sampleRouteValidationImports: validator.routeImports,
    sampleCreateValidationMiddleware: validator.createMiddleware,
    sampleUpdateValidationMiddleware: validator.updateMiddleware,
    sampleSwaggerImport,
    sampleSwaggerExport
  };
};

const toPackageNameFromDirectory = (directoryPath: string): string => {
  const baseName = path.basename(directoryPath).toLowerCase();
  const normalized = baseName
    .replace(/[^a-z0-9-._~]/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/--+/g, '-');

  return normalized || 'express-arch-cli-app';
};

const resolveProjectMetadata = (
  answers: CliAnswers,
  targetDirectory: string
): { packageName: string; templateProjectName: string } => {
  if (answers.projectName === '.') {
    const packageName = toPackageNameFromDirectory(targetDirectory);
    return { packageName, templateProjectName: packageName };
  }

  return { packageName: answers.projectName, templateProjectName: answers.projectName };
};

export const generateProject = async (
  answers: CliAnswers,
  rootDirectory = process.cwd()
): Promise<{ targetDirectory: string; usedCurrentDirectory: boolean }> => {
  const targetDirectory = await createProjectDirectory(rootDirectory, answers.projectName);
  const metadata = resolveProjectMetadata(answers, targetDirectory);
  const templateDirectories = resolveTemplateDirectories(answers);
  const context = createTemplateContext({
    ...answers,
    projectName: metadata.templateProjectName
  });

  await createFilesFromTemplates(templateDirectories, targetDirectory, context);

  const packageJson = generatePackageJson(answers, metadata.packageName);
  await writeTextFile(
    path.join(targetDirectory, 'package.json'),
    `${JSON.stringify(packageJson, null, 2)}\n`
  );

  if (answers.initializeGit) {
    await runCommand('git', ['init'], targetDirectory);
  }

  if (answers.installDependencies) {
    await installDependencies(answers.packageManager, targetDirectory);
  }

  return { targetDirectory, usedCurrentDirectory: answers.projectName === '.' };
};
