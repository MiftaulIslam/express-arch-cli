import { prisma } from '../../config/db.js';

const runSeeds = async (): Promise<void> => {
  await prisma.sample.upsert({
    where: { id: 'sample-seed' },
    update: {},
    create: {
      id: 'sample-seed',
      name: 'Seeded Sample',
      description: 'Created by Prisma seed script'
    }
  });
};

runSeeds()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
