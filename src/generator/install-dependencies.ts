import { getInstallCommand, runCommand } from '../utils/package-manager.js';
import type { PackageManager } from '../types/answers.js';

export const installDependencies = async (
  packageManager: PackageManager,
  targetDirectory: string
): Promise<void> => {
  const { command, args } = getInstallCommand(packageManager);
  await runCommand(command, args, targetDirectory);
};