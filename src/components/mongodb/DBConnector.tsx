import {
  tinkerforgeDTO,
  tinkerforgeEntity,
} from "@/models/zTinkerforgeSensor.schema";
import { MongoClient } from "mongodb";
import { config } from "@/../config";
// eslint-disable-next-line sort-imports
import { genericDTO, genericEntity } from "@/models/GenericSensor.schema";

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

export async function insertGenericSensor(
  sensorDTO: genericDTO,
): Promise<void> {
  try {
    const client = await connectToDB(); // Connect to the database
    const database = client.db("sensor_config"); // Use the correct database
    const sensors = database.collection<genericEntity>("GenericSensor"); // Target the correct collection

    // Map the DTO to the Entity schema
    const sensorEntity: genericEntity = {
      _id: { $uuid: sensorDTO.id },
      date_created: { $date: sensorDTO.date_created },
      date_modified: { $date: sensorDTO.date_modified },
      enabled: sensorDTO.enabled,
      label: sensorDTO.label,
      description: sensorDTO.description,
      host: sensorDTO.host,
      driver: sensorDTO.driver,
      interval: sensorDTO.interval,
      on_connect: sensorDTO.on_connect,
      on_read: sensorDTO.on_read,
      on_after_read: sensorDTO.on_after_read,
      on_disconnect: sensorDTO.on_disconnect,
      topic: sensorDTO.topic,
      unit: sensorDTO.unit,
    };

    await sensors.insertOne(sensorEntity);
  } catch (error) {
    console.error("Error inserting generic sensor document:", error);
    throw error;
  }
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
