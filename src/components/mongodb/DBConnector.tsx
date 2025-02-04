import {
  tinkerforgeDTO,
  tinkerforgeEntity,
} from "@/models/zTinkerforgeSensor.schema";
import { MongoClient } from "mongodb";
import { config } from "@/../config";

// Cache the db client and promise (to create one) so that (hot) reloading will reuse the connection
// We use a global variable for this. See its type declaration below.
// See https://github.com/vercel/next.js/issues/45483#discussioncomment-898067 for more details on this
// issue.
const globalWithMongo = global as typeof globalThis & {
  mongo: {
    client: MongoClient | null;
    promise: Promise<MongoClient> | null;
  };
};

let cached = globalWithMongo.mongo;
if (!cached) cached = globalWithMongo.mongo = { client: null, promise: null };

/**
 * Connect to the database if neccessary. If the database connection exists, returns
 * the cached client.
 *
 * @async
 * @return {Promise<MongoClient>} The database client object.
 *
 * @example
 *
 *     const client = await connectToDB();
 */
async function connectToDB(): Promise<MongoClient> {
  if (cached.client) return cached.client;

  async function createClient(): Promise<MongoClient> {
    const url: string = await config.krakenConfigsMongodbConnectionString;
    const opts = {
      // Do we need options?
    };
    cached.client = await MongoClient.connect(url, opts);
    return cached.client;
  }

  if (!cached.promise) {
    cached.promise = createClient();
  }
  return await cached.promise;
}

/*
 * Queries all documents from TinkerforgeSensor collection
 */
export async function getAllDocuments(): Promise<Array<tinkerforgeDTO>> {
  const client = await connectToDB();
  const database = await client.db("sensor_config");
  const sensors =
    await database.collection<tinkerforgeEntity>("TinkerforgeSensor");
  let allDocs = await sensors.find({}).toArray();
  console.log(allDocs);

  return allDocs.map(function (doc) {
    return tinkerforgeDTO.convertFromEntity(doc);
  });
}

export async function editSensorConfig(
  sensorId: string,
  updatedConfig: Partial<tinkerforgeDTO>,
): Promise<string> {
  if (typeof sensorId !== "string") {
    throw new Error("Sensor ID must be a string");
  }

  if (!updatedConfig || Object.keys(updatedConfig).length === 0) {
    throw new Error("Updated configuration cannot be empty");
  }

  const client = await connectToDB();
  const database = client.db("sensor_config");
  const sensors = database.collection<tinkerforgeEntity>("TinkerforgeSensor");

  try {
    // Define the filter to find the sensor
    const filter = { "_id.$uuid": sensorId };

    // Check if the sensor exists
    const existingSensor = await sensors.findOne(filter);
    if (!existingSensor) {
      return `No sensor found with ID: ${sensorId}`;
    }

    // Apply the updates
    const update = {
      $set: {
        ...Object.keys(updatedConfig).reduce(
          (acc, key) => {
            acc[key] = updatedConfig[key as keyof tinkerforgeDTO];
            return acc;
          },
          {} as Record<string, unknown>,
        ),
        "date_modified.$date": new Date().toISOString(),
      },
    };

    const result = await sensors.updateOne(filter, update);

    if (result.matchedCount === 0) {
      return `No sensor found with ID: ${sensorId}`;
    }

    if (result.modifiedCount === 0) {
      return `Sensor with ID: ${sensorId} found but not modified`;
    }

    return `Sensor with ID: ${sensorId} updated successfully`;
  } catch (error) {
    console.error("Error updating sensor:", error);
    throw new Error("Failed to update sensor configuration");
  } finally {
    await client.close();
  }
}

export default async function DBConnector() {
  try {
    let documents = await getAllDocuments();
    console.log("\nprinting documents start\n");
    console.log(documents);
    console.log("\nprinting documents end\n");
  } catch (error) {
    // Connection couldn't be established
    console.log("MongoDB Connection Setup Error:", error);
    return <span>error</span>;
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
  return <span>Connection successfully set up</span>;
}
