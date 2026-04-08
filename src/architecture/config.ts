import type {
  ArchitecturePresetId,
  ArchitectureType,
  ArchitectureVariant,
  CliAnswers,
  PatternType,
  ResolvedArchitectureConfig
} from '../types/answers.js';

interface PresetConfig {
  id: ArchitecturePresetId;
  label: string;
  architecture: ArchitectureType;
  variant: ArchitectureVariant;
  patterns: PatternType[];
}

const ARCHITECTURE_DISPLAY_NAMES: Record<ArchitectureType, string> = {
  'modular-monolith': 'Modular Monolith',
  'clean-architecture': 'Clean Architecture',
  hexagonal: 'Hexagonal Architecture',
  mvc: 'MVC'
};
const VARIANT_DISPLAY_NAMES: Record<ArchitectureVariant, string> = {
  'mvc-classic': 'Classic MVC API',
  'clean-layer-first': 'Layer-first Clean Architecture',
  'clean-feature-first': 'Feature-first Clean Architecture',
  'hexagonal-feature-first': 'Feature/module-first Hexagonal',
  'hexagonal-layer-grouped': 'Layer/grouped Hexagonal',
  'modular-simple': 'Simple module-first',
  'modular-internal-clean': 'Module-first with internal clean layers'
};

export const ARCHITECTURE_PATTERN_COMPATIBILITY: Record<ArchitectureType, PatternType[]> = {
  'modular-monolith': ['repository', 'service', 'controller', 'specification', 'unit-of-work', 'dependency-injection', 'factory'],
  'clean-architecture': ['repository', 'service', 'controller', 'specification', 'unit-of-work', 'dependency-injection', 'factory'],
  hexagonal: ['repository', 'service', 'controller', 'specification', 'unit-of-work', 'dependency-injection', 'factory'],
  mvc: ['repository', 'service', 'controller', 'dependency-injection', 'factory']
};

export const ARCHITECTURE_VARIANT_OPTIONS: Record<
  ArchitectureType,
  ReadonlyArray<{ value: ArchitectureVariant; name: string; description: string }>
> = {
  mvc: [{ value: 'mvc-classic', name: 'Classic MVC API', description: 'Root-by-type controllers/services/models/routes' }],
  'clean-architecture': [
    { value: 'clean-layer-first', name: 'Layer-first Clean Architecture', description: 'domain/application/infrastructure/presentation at root' },
    { value: 'clean-feature-first', name: 'Feature-first Clean Architecture', description: 'modules/<feature> containing clean layers' }
  ],
  hexagonal: [
    { value: 'hexagonal-feature-first', name: 'Feature/module-first Hexagonal', description: 'modules/<feature> with domain/ports/adapters' },
    { value: 'hexagonal-layer-grouped', name: 'Layer/grouped Hexagonal', description: 'root-level domain/application/ports/adapters' }
  ],
  'modular-monolith': [
    { value: 'modular-simple', name: 'Simple module-first', description: 'flat module files: controller/service/repository/route' },
    { value: 'modular-internal-clean', name: 'Module-first with internal clean layers', description: 'domain/application/infrastructure/presentation inside module' }
  ]
};

export const ARCHITECTURE_PRESETS: PresetConfig[] = [
  {
    id: 'modular-monolith-layered-repository-service',
    label: 'Modular Monolith + Layered + Repository + Service',
    architecture: 'modular-monolith',
    variant: 'modular-simple',
    patterns: ['repository', 'service', 'controller']
  },
  {
    id: 'clean-architecture-repository-unit-of-work',
    label: 'Clean Architecture + Repository + Unit of Work',
    architecture: 'clean-architecture',
    variant: 'clean-layer-first',
    patterns: ['repository', 'service', 'controller', 'unit-of-work']
  },
  {
    id: 'hexagonal-repository-dependency-injection',
    label: 'Hexagonal + Repository + Dependency Injection',
    architecture: 'hexagonal',
    variant: 'hexagonal-feature-first',
    patterns: ['repository', 'service', 'controller', 'dependency-injection']
  },
  {
    id: 'mvc-service-repository',
    label: 'MVC + Service + Repository',
    architecture: 'mvc',
    variant: 'mvc-classic',
    patterns: ['repository', 'service', 'controller']
  }
];

const PRESET_MAP = new Map(ARCHITECTURE_PRESETS.map((preset) => [preset.id, preset]));

const toDisplayPattern = (value: PatternType): string =>
  value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

export const getArchitectureDisplayName = (architecture: ArchitectureType): string =>
  ARCHITECTURE_DISPLAY_NAMES[architecture];

export const getCompatiblePatterns = (architecture: ArchitectureType): PatternType[] =>
  ARCHITECTURE_PATTERN_COMPATIBILITY[architecture];

export const getVariantOptions = (architecture: ArchitectureType) => ARCHITECTURE_VARIANT_OPTIONS[architecture];

export const getPresetById = (id: ArchitecturePresetId): PresetConfig | undefined => PRESET_MAP.get(id);
export const getVariantDisplayName = (variant: ArchitectureVariant): string => VARIANT_DISPLAY_NAMES[variant];

const uniquePatterns = (patterns: PatternType[]): PatternType[] => Array.from(new Set(patterns));

const ensureHttpScaffoldingPatterns = (patterns: PatternType[]): PatternType[] => {
  if (patterns.includes('controller')) {
    return patterns;
  }
  return [...patterns, 'controller'];
};

export const validatePatternDependencies = (patterns: readonly PatternType[]): string[] => {
  const errors: string[] = [];
  if (!patterns.includes('repository')) {
    if (patterns.includes('specification')) {
      errors.push('Specification requires Repository.');
    }
    if (patterns.includes('unit-of-work')) {
      errors.push('Unit of Work requires Repository.');
    }
  }
  return errors;
};

export const resolveArchitectureConfig = (answers: CliAnswers): ResolvedArchitectureConfig => {
  if (answers.useArchitecturePreset && answers.architecturePreset) {
    const preset = getPresetById(answers.architecturePreset);
    if (!preset) {
      throw new Error(`Unknown architecture preset: ${answers.architecturePreset}`);
    }

    const patterns = ensureHttpScaffoldingPatterns(uniquePatterns(preset.patterns));
    return {
      architecture: preset.architecture,
      variant: preset.variant,
      patterns,
      presetId: preset.id,
      displayName: `${getArchitectureDisplayName(preset.architecture)} (${patterns
        .map(toDisplayPattern)
        .join(' + ')}) - ${getVariantDisplayName(preset.variant)}`,
      templateKeys: [preset.architecture, ...patterns]
    };
  }

  if (!answers.architecture) {
    throw new Error('Architecture is required when not using a preset.');
  }

  const compatible = getCompatiblePatterns(answers.architecture);
  const selected = answers.patterns ?? [];
  const invalid = selected.filter((pattern) => !compatible.includes(pattern));
  if (invalid.length > 0) {
    throw new Error(
      `Invalid patterns for ${answers.architecture}: ${invalid.join(', ')}. Allowed: ${compatible.join(', ')}`
    );
  }

  const patterns = ensureHttpScaffoldingPatterns(uniquePatterns(selected));
  const dependencyErrors = validatePatternDependencies(patterns);
  if (dependencyErrors.length > 0) {
    throw new Error(dependencyErrors.join(' '));
  }
  const variant = answers.architectureVariant ?? getVariantOptions(answers.architecture)[0].value;
  return {
    architecture: answers.architecture,
    variant,
    patterns,
    displayName: `${getArchitectureDisplayName(answers.architecture)} (${patterns
      .map(toDisplayPattern)
      .join(' + ')}) - ${getVariantDisplayName(variant)}`,
    templateKeys: [answers.architecture, ...patterns]
  };
};
