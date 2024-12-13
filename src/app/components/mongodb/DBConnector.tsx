import { useEffect } from "react";
import { config } from "../../../../config";
import mongoose from "mongoose";
import TinkerforgeSensor from "@/app/models/tinkerforgeSensor";

async function StartSetup() {
  console.log("Starting MongoDB connection...");
  await mongoose.connect(`${config.krakenConfigsMongodbConnectionString}`);
  console.log("Connection with MongoDB successfully established.");
}


async function run() {
  try {
    console.log("Starting ping test...")
    if (mongoose.connection.db === undefined) {
      throw new Error("Database not connected");
    } else {
      await mongoose.connection.db.admin().command({ ping: 1 });
    }
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    console.log("Disconnecting from MongoDB...")
  }
}


async function getAllDocuments() {
  return await TinkerforgeSensor.find({});
}



export default async function DBConnector() {

  try {
    await StartSetup();
    await run();
  } catch (error) {
    console.log("Catch Error:", error);
  }

  let documents = await getAllDocuments();
  console.log("\nprinting documents start\n");
  console.log(documents);
  console.log("\nprinting documents end\n");
  return (
    <span></span>
  )
}
