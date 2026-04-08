import type { CliAnswers } from '../types/answers.js';

interface GeneratedPackageJson {
  name: string;
  version: string;
  private: boolean;
  type: 'module';
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

const BASE_DEPENDENCIES: Record<string, string> = {
  express: '^4.21.2',
  cors: '^2.8.5',
  dotenv: '^16.6.1',
  helmet: '^8.1.0',
  'cookie-parser': '^1.4.7'
};

const BASE_DEV_DEPENDENCIES: Record<string, string> = {
  typescript: '^5.9.2',
  tsx: '^4.20.5',
  '@types/node': '^22.18.1',
  '@types/express': '^4.17.23',
  '@types/cors': '^2.8.18',
  '@types/cookie-parser': '^1.4.9',
  eslint: '^9.35.0',
  prettier: '^3.6.2',
  '@typescript-eslint/eslint-plugin': '^8.43.0',
  '@typescript-eslint/parser': '^8.43.0',
  'eslint-config-prettier': '^10.1.8'
};

const getDatabasePackages = (answers: CliAnswers): { deps: Record<string, string>; devDeps: Record<string, string> } => {
  const deps: Record<string, string> = {};
  const devDeps: Record<string, string> = {};

  if (answers.database === 'mongodb' && answers.orm === 'mongoose') {
    deps.mongoose = '^8.18.0';
    return { deps, devDeps };
  }

  if (answers.orm === 'drizzle') {
    deps['drizzle-orm'] = '^0.44.5';
    devDeps['drizzle-kit'] = '^0.31.4';

    if (answers.database === 'postgres') {
      deps.postgres = '^3.4.7';
    }

    if (answers.database === 'mysql') {
      deps.mysql2 = '^3.14.5';
    }

    return { deps, devDeps };
  }

  if (answers.orm === 'prisma') {
    deps['@prisma/client'] = '^6.15.0';
    devDeps.prisma = '^6.15.0';
    return { deps, devDeps };
  }

  if (answers.orm === 'typeorm') {
    deps.typeorm = '^0.3.26';
    deps['reflect-metadata'] = '^0.2.2';

    if (answers.database === 'postgres') {
      deps.pg = '^8.16.3';
    }

    if (answers.database === 'mysql') {
      deps.mysql2 = '^3.14.5';
    }
  }

  return { deps, devDeps };
};

const getLoggerPackages = (logger: CliAnswers['logger']): Record<string, string> => {
  if (logger === 'pino') {
    return {
      pino: '^9.9.0',
      'pino-http': '^10.5.0',
      'pino-pretty': '^13.1.2'
    };
  }

  if (logger === 'winston') {
    return {
      winston: '^3.17.0'
    };
  }

  return {};
};

const getValidatorPackages = (validator: CliAnswers['validator']): Record<string, string> => {
  if (validator === 'zod') {
    return { zod: '^4.1.5' };
  }

  if (validator === 'yup') {
    return { yup: '^1.7.0' };
  }

  return {};
};

const getSwaggerPackages = (enabled: boolean): { deps: Record<string, string>; devDeps: Record<string, string> } => {
  if (!enabled) {
    return { deps: {}, devDeps: {} };
  }

  return {
    deps: { 'swagger-ui-express': '^5.0.1' },
    devDeps: { '@types/swagger-ui-express': '^4.1.8' }
  };
};

const getScripts = (answers: CliAnswers): Record<string, string> => {
  const scripts: Record<string, string> = {
    dev: 'tsx watch src/index.ts',
    build: 'tsc -p tsconfig.json',
    start: 'node dist/index.js',
    typecheck: 'tsc -p tsconfig.json --noEmit',
    lint: 'eslint .',
    'lint:fix': 'eslint . --fix',
    format: 'prettier --write .'
  };

  if (answers.orm === 'drizzle') {
    scripts['db:generate'] = 'drizzle-kit generate';
    scripts['db:migrate'] = 'drizzle-kit migrate';
    scripts['db:push'] = 'drizzle-kit push';
    scripts['db:studio'] = 'drizzle-kit studio';
    scripts['db:seed'] = 'tsx src/database/seeds/index.ts';
  }

  if (answers.orm === 'prisma') {
    scripts['prisma:generate'] = 'prisma generate';
    scripts['prisma:migrate'] = 'prisma migrate dev';
    scripts['prisma:studio'] = 'prisma studio';
    scripts['db:seed'] = 'tsx src/database/seeds/index.ts';
  }

  if (answers.orm === 'mongoose') {
    scripts['db:seed'] = 'tsx src/database/seeds/index.ts';
  }

  if (answers.orm === 'typeorm') {
    scripts['db:seed'] = 'tsx src/database/seeds/index.ts';
  }

  return scripts;
};

const sortObject = (value: Record<string, string>): Record<string, string> =>
  Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)));

export const generatePackageJson = (
  answers: CliAnswers,
  packageName: string
): GeneratedPackageJson => {
  const { deps: databaseDeps, devDeps: databaseDevDeps } = getDatabasePackages(answers);
  const loggerDeps = getLoggerPackages(answers.logger);
  const validatorDeps = getValidatorPackages(answers.validator);
  const { deps: swaggerDeps, devDeps: swaggerDevDeps } = getSwaggerPackages(answers.swagger);

  return {
    name: packageName,
    version: '0.1.0',
    private: true,
    type: 'module',
    scripts: getScripts(answers),
    dependencies: sortObject({
      ...BASE_DEPENDENCIES,
      ...databaseDeps,
      ...loggerDeps,
      ...validatorDeps,
      ...swaggerDeps
    }),
    devDependencies: sortObject({
      ...BASE_DEV_DEPENDENCIES,
      ...databaseDevDeps,
      ...swaggerDevDeps
    })
  };
};
