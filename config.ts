import { connection } from "next/server";

async function getEnvironmentVariable(
  environmentVariable: string,
): Promise<string> {
  await connection();
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  // Check if env var is set
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`,
    );
  } else {
    return unvalidatedEnvironmentVariable;
  }
}

export const config = {
  get krakenConfigsMongodbConnectionString() {
    return getEnvironmentVariable("KRAKEN_CONFIGS_MONGODB_CONNECTION_STRING");
  },
};
