import { spawn } from 'node:child_process';
import type { PackageManager } from '../types/answers.js';

export const getInstallCommand = (packageManager: PackageManager): { command: string; args: string[] } => {
  switch (packageManager) {
    case 'npm':
      return { command: 'npm', args: ['install'] };
    case 'pnpm':
      return { command: 'pnpm', args: ['install'] };
    case 'yarn':
      return { command: 'yarn', args: ['install'] };
    default:
      return { command: 'npm', args: ['install'] };
  }
};

export const runCommand = async (
  command: string,
  args: string[],
  cwd: string
): Promise<void> => {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: process.platform === 'win32'
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`Command failed: ${command} ${args.join(' ')}`));
    });

    child.on('error', reject);
  });
};