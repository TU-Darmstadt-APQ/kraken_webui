import {
  convertToEntity,
  tinkerforgeDTO,
  tinkerforgeEntity,
} from "@/models/zTinkerforgeSensor.schema";
import { MongoClient, UUID } from "mongodb";
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
 * Upserts a sensor in the database using the provided sensor data transfer object (DTO).
 * If a sensor with the given ID exists, it is updated; otherwise, a new sensor is inserted.
 *
 * @param {Omit<tinkerforgeDTO, "date_modified"> & Partial<{ date_created: string }>} dto -
 *        The sensor data transfer object to be upserted. If dto.date_created is not provided, a new sensor insertion
 *        is assumed.
 * @returns {Promise<void>} A promise that resolves when the upsert is complete.
 *
 * @throws {Error} If the upsert fails, an error is thrown with details.
 * Possible Errors:
 * - `MongoWriteException`: If the write fails due to a specific write exception.
 * - `MongoWriteConcernException`: If the write fails due to being unable to fulfill the write concern.
 * - `MongoCommandException`: If the write fails due to a specific command exception.
 * - `MongoException`: If the write fails due to some other failure.
 * - `ZodIssue`: If the sensorDTO validation fails due to schema issues.
 */
export async function upsertSensor(
  dto: Omit<tinkerforgeDTO, "date_modified"> &
    Partial<{ date_created: string }>,
): Promise<void> {
  try {
    const client = await connectToDB();
    const database = client.db("sensor_config");
    const sensors = database.collection<tinkerforgeEntity>("TinkerforgeSensor");

    // Check if the sensor already exists
    const existingSensor = await sensors.findOne({ _id: new UUID(dto.id) });
    
    if (existingSensor) {
      // UPDATING an existing sensor: don't modify date_created at all
      
      // Create DTO without date_created field (we don't want to touch it)
      const updatedDTO: tinkerforgeDTO = {
        ...dto,
        date_created: existingSensor.date_created.toISOString(), // Use the one from DB
        date_modified: new Date().toISOString(),
      };
      
      // Convert to entity
      const candidate = convertToEntity(updatedDTO);
      
      // When updating, use $set to avoid modifying fields we don't specify
      await sensors.updateOne(
        { _id: candidate._id },
        { 
          $set: {
            // List all fields except date_created
            date_modified: candidate.date_modified,
            enabled: candidate.enabled,
            label: candidate.label,
            description: candidate.description,
            uid: candidate.uid,
            config: candidate.config,
            on_connect: candidate.on_connect
            // Intentionally omitting date_created
          }
        }
      );
    } else {
      // CREATING a new sensor: set date_created
      const newDTO: tinkerforgeDTO = {
        ...dto,
        date_created: new Date().toISOString(),
        date_modified: new Date().toISOString(),
      };
      
      // Convert to entity
      const candidate = convertToEntity(newDTO);
      
      // Insert the new document
      await sensors.insertOne(candidate);
    }
  } catch (error) {
    throw error;
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
