import { config } from "@/../config";

const { MongoClient } = require("mongodb");
const uri = config.krakenConfigsMongodbConnectionString;
const client = new MongoClient(uri);

async function connectToDB() {
  await client.connect();
}

/*
 * Queries all documents from TinkerforgeSensor collection
 */
export async function getAllDocuments() {
  const database = await client.db("sensor_config");
  const sensors = await database.collection("TinkerforgeSensor");
  let allDocs = await sensors.find({}).toArray();
  // Converting to plain values
  // let sensorData = JSON.stringify(Object.values(allDocs), null, 2);
  // let sensorData = Object.values(allDocs);

  return allDocs;
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
