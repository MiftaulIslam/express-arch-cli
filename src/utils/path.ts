import { fileURLToPath } from 'node:url';
import path from 'node:path';

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);

export const getPackageRoot = (): string => path.resolve(currentDir, '..', '..');

export const resolveFromPackageRoot = (...segments: string[]): string =>
  path.resolve(getPackageRoot(), ...segments);

export const toPosixPath = (targetPath: string): string => targetPath.split(path.sep).join('/');