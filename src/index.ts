import path from 'node:path';
import { askQuestions } from './prompts/ask-questions.js';
import { generateProject } from './generator/generate-project.js';

const run = async (): Promise<void> => {
  console.log('express-arch-cli');
  console.log('Scaffold a production-ready TypeScript Node.js backend.\n');

  const answers = await askQuestions();

  console.log('\nGenerating your project...');
  const { targetDirectory, usedCurrentDirectory } = await generateProject(answers);

  console.log('\nProject created successfully.');
  console.log(`Location: ${targetDirectory}`);
  console.log('\nNext steps:');

  if (!usedCurrentDirectory) {
    console.log(`1. cd ${path.relative(process.cwd(), targetDirectory) || answers.projectName}`);
  }

  if (!answers.installDependencies) {
    const installCmd =
      answers.packageManager === 'npm'
        ? 'npm install'
        : answers.packageManager === 'pnpm'
          ? 'pnpm install'
          : 'yarn install';
    if (!usedCurrentDirectory) {
      console.log(`2. ${installCmd}`);
      console.log('3. npm run dev');
    } else {
      console.log(`1. ${installCmd}`);
      console.log('2. npm run dev');
    }
  } else {
    if (!usedCurrentDirectory) {
      console.log('2. npm run dev');
    } else {
      console.log('1. npm run dev');
    }
  }
};

run().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`\nFailed to generate project: ${message}`);
  process.exit(1);
});
