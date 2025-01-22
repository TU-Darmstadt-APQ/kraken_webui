import { config } from "@/../config";
import { Post, DateType } from "@/types";

const { MongoClient } = require("mongodb");
const uri = config.krakenConfigsMongodbConnectionString;
const client = new MongoClient(uri);

async function connectToDB() {
  await client.connect();
}

/*
 * Queries all documents from TinkerforgeSensor collection
 */
export async function getAllDocuments(): Promise<Post[]> {
  const database = await client.db("sensor_config");
  const sensors = await database.collection("TinkerforgeSensor");
  let allDocs = await sensors.find({}).toArray();

  // Convert data from MongoDB to Post[]
  // (!!!) Otherwise the data will not be automatically converted
  const posts: Post[] = allDocs.map((doc: any) => ({
    uuid: doc.uuid,
    title: doc.title || undefined,
    description: doc.description || undefined,
    label: doc.label || undefined,
    date_created: convertToDateType(doc.date_created),
    date_modified: convertToDateType(doc.date_modified),
    config: doc.config || undefined,
    on_connect: doc.on_connect || undefined,
    topic: doc.topic,
    unit: doc.unit,
    driver: doc.driver,
    sensor_type: doc.sensor_type || undefined,
    host: doc.host || undefined,
    enabled: doc.enabled || undefined,
    port: doc.port || undefined,
    pad: doc.pad || undefined,
    sad: doc.sad || undefined,
  }));

  return posts;
}

function convertToDateType(date: any): DateType {
  if (!date) return {};
  const jsDate = new Date(date);
  return {
    day: jsDate.getUTCDate(),
    month: jsDate.getUTCMonth() + 1, // Months in JS start from 0
    year: jsDate.getUTCFullYear(),
    nanoseconds: 0, // MongoDB does not support nano-seconds
  };
}

export default async function DBConnector() {
  let connectionFailed = false;
  try {
    await connectToDB();
    let documents = await getAllDocuments();
    console.log("\nprinting documents start\n");
    console.log(documents);
    console.log("\nprinting documents end\n");
  } catch (error) {
    // Connection couldn't be established
    connectionFailed = true;
    console.log("MongoDB Connection Setup Error:", error);
    return <span>error2</span>;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  if (connectionFailed) {
    // Display connection error
    return <span>error</span>;
  } else {
    return <span>Connection successfully set up</span>;
  }
}
