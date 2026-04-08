import { checkbox, confirm, input, select } from '@inquirer/prompts';
import {
  ARCHITECTURE_OPTIONS,
  ARCHITECTURE_PRESET_OPTIONS,
  DATABASE_OPTIONS,
  LOGGER_OPTIONS,
  PATTERN_OPTIONS,
  ORM_OPTIONS,
  PACKAGE_MANAGER_OPTIONS,
  VALIDATOR_OPTIONS
} from '../constants/options.js';
import { getCompatiblePatterns, getVariantOptions, validatePatternDependencies } from '../architecture/config.js';
import type { ArchitectureType, CliAnswers, Database, Orm, PatternType } from '../types/answers.js';

const PROJECT_NAME_PATTERN = /^(?:@[a-z0-9-~][a-z0-9-._~]*\/[a-z0-9-~][a-z0-9-._~]*|[a-z0-9-~][a-z0-9-._~]*)$/;

export const askQuestions = async (): Promise<CliAnswers> => {
  const projectName = await input({
    message: 'Project name (use "." for current directory)',
    default: 'my-express-arch-cli-app',
    validate: (value) => {
      const normalizedValue = value.trim();

      if (!normalizedValue) {
        return 'Project name is required.';
      }

      if (normalizedValue === '.') {
        return true;
      }

      if (!PROJECT_NAME_PATTERN.test(normalizedValue)) {
        return 'Use a valid npm-style package name.';
      }
      return true;
    }
  });

  const useArchitecturePreset = await confirm({
    message: 'Do you want to use a built-in architecture/pattern preset?',
    default: true
  });

  let architecturePreset: CliAnswers['architecturePreset'];
  let architecture: ArchitectureType | undefined;
  let architectureVariant: CliAnswers['architectureVariant'];
  let patterns: PatternType[] | undefined;

  if (useArchitecturePreset) {
    architecturePreset = await select({
      message: 'Architecture preset',
      choices: ARCHITECTURE_PRESET_OPTIONS.map((option) => ({ name: option.name, value: option.value }))
    });
  } else {
    architecture = await select<ArchitectureType>({
      message: 'Architecture',
      choices: ARCHITECTURE_OPTIONS.map((option) => ({ name: option.name, value: option.value }))
    });

    architectureVariant = await select({
      message: 'Architecture variant / structure mode',
      choices: getVariantOptions(architecture).map((variant) => ({
        name: `${variant.name} - ${variant.description}`,
        value: variant.value
      }))
    });

    const allowedPatterns = new Set(getCompatiblePatterns(architecture));
    patterns = await checkbox<PatternType>({
      message: 'Select architecture patterns',
      choices: PATTERN_OPTIONS.map((option) => {
        if (!allowedPatterns.has(option.value)) {
          return {
            name: `${option.name} - ${option.description}`,
            value: option.value,
            disabled: `Unavailable for ${architecture}`
          };
        }

        return {
          name: `${option.name} - ${option.description}`,
          value: option.value
        };
      }),
      validate: (selected) => {
        const selectedPatterns = selected as unknown as readonly PatternType[];
        if (selected.length === 0) {
          return 'Select at least one pattern.';
        }
        const dependencyErrors = validatePatternDependencies(selectedPatterns);
        return dependencyErrors.length === 0 ? true : dependencyErrors.join(' ');
      }
    });
  }

  const database = await select<Database>({
    message: 'Database',
    choices: DATABASE_OPTIONS.map((option) => ({ name: option.name, value: option.value }))
  });

  const ormChoices = ORM_OPTIONS[database].map((option) => ({
    name: option.name,
    value: option.value
  }));

  const orm = await select<Orm>({
    message: 'ORM / ODM',
    choices: ormChoices
  });

  const logger = await select({
    message: 'Logger',
    choices: LOGGER_OPTIONS.map((option) => ({ name: option.name, value: option.value }))
  });

  const validator = await select({
    message: 'Schema validation',
    choices: VALIDATOR_OPTIONS.map((option) => ({ name: option.name, value: option.value }))
  });

  const swagger = await confirm({
    message: 'Need Swagger?',
    default: true
  });

  const packageManager = await select({
    message: 'Package manager',
    choices: PACKAGE_MANAGER_OPTIONS.map((option) => ({ name: option.name, value: option.value }))
  });

  const installDependencies = await confirm({
    message: 'Install dependencies now?',
    default: true
  });

  const initializeGit = await confirm({
    message: 'Initialize git?',
    default: true
  });

  const includeExampleModule = await confirm({
    message: 'Include example module?',
    default: true
  });

  return {
    projectName: projectName.trim(),
    useArchitecturePreset,
    architecturePreset,
    architecture,
    architectureVariant,
    patterns,
    database,
    orm,
    logger,
    validator,
    swagger,
    packageManager,
    installDependencies,
    initializeGit,
    includeExampleModule
  };
};
