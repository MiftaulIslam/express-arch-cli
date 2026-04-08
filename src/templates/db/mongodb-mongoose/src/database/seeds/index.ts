const runSeeds = async (): Promise<void> => {
  console.log('MongoDB Mongoose seed executed.');
};

runSeeds()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
