import { promises as fs } from 'node:fs';
import path from 'node:path';

const TEXT_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.cjs',
  '.mjs',
  '.json',
  '.md',
  '.txt',
  '.env',
  '.example',
  '.yml',
  '.yaml',
  '.gitignore'
]);

export const ensureDirectory = async (directoryPath: string): Promise<void> => {
  await fs.mkdir(directoryPath, { recursive: true });
};

export const pathExists = async (targetPath: string): Promise<boolean> => {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
};

export const isDirectoryEmpty = async (directoryPath: string): Promise<boolean> => {
  const entries = await fs.readdir(directoryPath);
  return entries.length === 0;
};

export const writeTextFile = async (targetPath: string, content: string): Promise<void> => {
  await ensureDirectory(path.dirname(targetPath));
  await fs.writeFile(targetPath, content, 'utf-8');
};

export const listFilesRecursive = async (directoryPath: string): Promise<string[]> => {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const all = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) {
        return listFilesRecursive(fullPath);
      }
      return [fullPath];
    })
  );

  return all.flat();
};

export const isTextFile = (filePath: string): boolean => {
  const extension = path.extname(filePath);
  if (TEXT_EXTENSIONS.has(extension)) {
    return true;
  }

  const baseName = path.basename(filePath);
  return baseName.startsWith('.') || baseName === 'Dockerfile';
};