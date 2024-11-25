const getEnvironmentVariable = (environmentVariable: string): string => {
    const unvalidatedEnvironmentVariable = process.env[environmentVariable];
    // Check if env var is set
    if (!unvalidatedEnvironmentVariable) {
      throw new Error(
        `Couldn't find environment variable: ${environmentVariable}`
      );
    } else {
      return unvalidatedEnvironmentVariable;
    }
  };
  
  export const config = {
    krakenConfigsMongodbCredentials: getEnvironmentVariable("KRAKEN_CONFIGS_MONGODB_CREDENTIALS"),
    krakenConfigsMongodbHost: getEnvironmentVariable("KRAKEN_CONFIGS_MONGODB_HOST"),
    krakenConfigsMongodbPort: getEnvironmentVariable("KRAKEN_CONFIGS_MONGODB_PORT")
  };