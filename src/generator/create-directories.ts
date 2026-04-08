import path from 'node:path';
import { ensureDirectory, isDirectoryEmpty, pathExists } from '../utils/file.js';

export const createProjectDirectory = async (
  rootPath: string,
  projectName: string
): Promise<string> => {
  const targetDirectory =
    projectName === '.' ? path.resolve(rootPath) : path.resolve(rootPath, projectName);
  const exists = await pathExists(targetDirectory);

  if (exists) {
    const empty = await isDirectoryEmpty(targetDirectory);
    if (!empty) {
      throw new Error(
        `Target directory already exists and is not empty: ${targetDirectory}. Use an empty directory.`
      );
    }
  }

  await ensureDirectory(targetDirectory);
  return targetDirectory;
};
