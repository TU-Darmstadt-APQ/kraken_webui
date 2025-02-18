import {
  convertToEntity,
  tinkerforgeDTO,
  tinkerforgeEntity,
  tinkerforgeEntitySchema,
} from "@/models/zTinkerforgeSensor.schema";
import { MongoClient } from "mongodb";
import { UUID } from "bson";
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
/**
 * Inserts a new sensor into the database.
 *
 * @param {Omit<tinkerforgeDTO, "date_created" | "date_modified">} dto - The sensor data transfer object to be inserted, excluding date_created and date_modified fields. The date_created and date_modified field will be filled by this function using the current date.
 * @returns {Promise<void>} A promise that resolves to nothing if insertion is successful.
 *
 * @throws {Error} If the insertion fails, an error is thrown with details.
 * Possible Errors:
 * - `MongoWriteException`: If the write fails due to a specific write exception.
 * - `MongoWriteConcernException`: If the write fails due to being unable to fulfill the write concern.
 * - `MongoCommandException`: If the write fails due to a specific command exception.
 * - `MongoException`: If the write fails due to some other failure.
 * - `ZodIssue`: If the sensorDTO validation fails due to schema issues.
 */
export async function insertSensor(
  dto: Omit<tinkerforgeDTO, "date_created" | "date_modified">,
): Promise<void> {
  try {
    const client = await connectToDB();
    const database = client.db("sensor_config");
    const sensors = database.collection<tinkerforgeEntity>("TinkerforgeSensor");

    const currentDate = new Date();
    const { id, ...noIdDto } = dto;
    const candidate = tinkerforgeEntitySchema.parse({
      _id: new UUID(id),
      ...noIdDto,
      date_created: currentDate,
      date_modified: currentDate,
    });

    await sensors.insertOne(candidate);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to insert sensor: ${errorMessage}`);
  }
}

/**
 * Deletes a sensor from the database.
 *
 * @param {tinkerforgeDTO} sensorDTO - The sensor data transfer object containing the ID of the sensor to be deleted.
 * @returns {Promise<Void>} A promise that resolves to nothing if deletion is successful.
 *
 * "No sensor with uuid  ${entity._id} could be found." if deletion was not successful.
 *
 * @throws {Error} If the deletion fails, an error is thrown with details.
 * Possible Errors:
 * - `MongoWriteException`: If the write fails due to a specific write exception.
 * - `MongoWriteConcernException`: If the write fails due to being unable to fulfill the write concern.
 * - `MongoCommandException`: If the write fails due to a specific command exception.
 * - `MongoException`: If the write fails due to some other failure.
 * - `ZodIssue`: If the sensorDTO validation fails due to schema issues.
 */
export async function deleteSensor(sensorDTO: tinkerforgeDTO): Promise<void> {
  const client = await connectToDB();
  const database = client.db("sensor_config");
  const sensors = database.collection<tinkerforgeEntity>("TinkerforgeSensor");

  try {
    // Convert the DTOto entity
    const entity = convertToEntity(sensorDTO);
    // Attempt to delete sensor
    const response = await sensors.deleteOne({ _id: entity._id });

    if (response.deletedCount != 1) {
      throw new Error(`No sensor with uuid ${entity._id} could be found.`);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to delete sensor ${sensorDTO.id}: ${errorMessage}`);
  }
}
