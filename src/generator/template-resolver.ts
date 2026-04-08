import path from 'node:path';
import { resolveArchitectureConfig } from '../architecture/config.js';
import type { CliAnswers } from '../types/answers.js';
import { resolveFromPackageRoot } from '../utils/path.js';

export const resolveTemplateDirectories = (answers: CliAnswers): string[] => {
  const architecture = resolveArchitectureConfig(answers);
  const directories: string[] = [resolveFromPackageRoot('src', 'templates', 'base')];

  directories.push(
    resolveFromPackageRoot('src', 'templates', 'architectures', architecture.architecture, 'core')
  );
  directories.push(
    resolveFromPackageRoot(
      'src',
      'templates',
      'architectures',
      architecture.architecture,
      'variants',
      architecture.variant,
      'core'
    )
  );

  if (architecture.presetId) {
    directories.push(resolveFromPackageRoot('src', 'templates', 'presets', architecture.presetId));
  }

  for (const pattern of architecture.patterns) {
    directories.push(resolveFromPackageRoot('src', 'templates', 'patterns', pattern));
  }

  if (answers.includeExampleModule) {
    if (architecture.architecture === 'modular-monolith') {
      directories.push(resolveFromPackageRoot('src', 'templates', 'features', 'sample'));
    } else if (
      architecture.architecture !== 'mvc' &&
      architecture.variant !== 'clean-layer-first' &&
      architecture.variant !== 'hexagonal-layer-grouped'
    ) {
      directories.push(resolveFromPackageRoot('src', 'templates', 'architectures', architecture.architecture, 'sample'));
    }
    directories.push(
      resolveFromPackageRoot(
        'src',
        'templates',
        'architectures',
        architecture.architecture,
        'variants',
        architecture.variant,
        'sample'
      )
    );
  }

  directories.push(resolveFromPackageRoot('src', 'templates', 'db', `${answers.database}-${answers.orm}`));
  directories.push(resolveFromPackageRoot('src', 'templates', 'logger', answers.logger));

  if (answers.validator !== 'none') {
    directories.push(resolveFromPackageRoot('src', 'templates', 'validator', answers.validator));
  }

  if (answers.swagger) {
    directories.push(resolveFromPackageRoot('src', 'templates', 'features', 'swagger'));
  }

  return directories.map((directory) => path.resolve(directory));
};