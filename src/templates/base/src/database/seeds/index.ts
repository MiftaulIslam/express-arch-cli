export const runSeeds = async (): Promise<void> => {
  return Promise.resolve();
};

if (import.meta.url === `file://${process.argv[1]}`) {
  runSeeds()
    .then(() => {
      console.log('Seed process completed.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seed process failed:', error);
      process.exit(1);
    });
}