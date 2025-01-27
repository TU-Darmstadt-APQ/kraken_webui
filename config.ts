const getEnvironmentVariable = (envVar: string): string => {
  const unvalidatedEnvVar = process.env[envVar];
  // Check if env var is set
  if (!unvalidatedEnvVar) {
    throw new Error(`Couldn't find environment variable: ${envVar}`);
  } else {
    const validatedEnvVar = unvalidatedEnvVar;
    return validatedEnvVar;
  }
};

export function getDBConnectionString(): string {
  return getEnvironmentVariable("KRAKEN_CONFIGS_MONGODB_CONNECTION_STRING");
}
