import { config } from "../../../../config";
import mongoose from "mongoose";
import TinkerforgeSensor from "@/app/models/Tinkerforgesensor.schema";

/*
 * Creates a connection with MongoDB
 */
async function StartSetup() {
  console.log("Starting MongoDB connection...");
  await mongoose.connect(`${config.krakenConfigsMongodbConnectionString}`);
  console.log("Connection with MongoDB successfully established.");
}

/*
 * Validates the MongoDB connection exists and is working
 */
async function ValidateMongoDBConnection() {
  console.log("MongoDB ping test - Starting...");
  if (mongoose.connection.db === undefined) {
    throw new Error(
      "MongoDB connection is undefined. Please check the db connector and the MongoDB connection setup.",
    );
  } else {
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("MongoDB ping test - successful");
  }
}

/*
 * Queries all documents from TinkerforgeSensor collection
 */
async function getAllDocuments() {
  return await TinkerforgeSensor.find({});
}

export default async function DBConnector() {
  let connectionFailed = false;
  try {
    await StartSetup();
    await ValidateMongoDBConnection();
  } catch (error) {
    connectionFailed = true;
    console.log("MongoDB Connection Setup Error:", error);
    return <span>error2</span>;
  }

  let documents = await getAllDocuments();
  console.log("\nprinting documents start\n");
  console.log(documents);
  console.log("\nprinting documents end\n");
  if (connectionFailed) {
    return <span>error</span>;
  } else {
    return <span>Connection successfully set up</span>;
  }
}
