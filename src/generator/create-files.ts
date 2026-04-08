import path from 'node:path';
import { promises as fs } from 'node:fs';
import { ensureDirectory, isTextFile, listFilesRecursive, writeTextFile } from '../utils/file.js';
import { renderTemplate } from '../utils/render-template.js';

export const createFilesFromTemplates = async (
  templateDirectories: string[],
  targetDirectory: string,
  context: Record<string, string>
): Promise<void> => {
  for (const templateDirectory of templateDirectories) {
    const files = await listFilesRecursive(templateDirectory);

    for (const sourcePath of files) {
      const relativePath = path.relative(templateDirectory, sourcePath);
      const outputPath = path.join(targetDirectory, relativePath);

      await ensureDirectory(path.dirname(outputPath));

      if (isTextFile(sourcePath)) {
        const raw = await fs.readFile(sourcePath, 'utf-8');
        const rendered = renderTemplate(raw, context);
        await writeTextFile(outputPath, rendered);
      } else {
        await fs.copyFile(sourcePath, outputPath);
      }
    }
  }
};