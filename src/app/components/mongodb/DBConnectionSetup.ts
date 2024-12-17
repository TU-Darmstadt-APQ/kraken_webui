import { config } from "../../../../config";
import mongoose from "mongoose";
import TinkerforgeSensor from "@/app/models/tinkerforgeSensor";



/*  
* Creates a connection with MongoDB
*/
export async function StartSetup() {
  console.log("Starting MongoDB connection...");
  await mongoose.connect(`${config.krakenConfigsMongodbConnectionString}`);
  console.log("Connection with MongoDB successfully established.");
}

/* 
* Validates the MongoDB connection exists and is working
*/
export async function ValidateMongoDBConnection() {
  console.log("MongoDB ping test - Starting...")
  if (mongoose.connection.db === undefined) {
    return { error: { message: "MongoDB connection is undefined. Please check the db connector and the MongoDB connection setup." } };
  } else {
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("MongoDB ping test - successful")
  }
}


/*
* Queries all documents from TinkerforgeSensor collection
*/
export async function getAllDocuments() {
  return await TinkerforgeSensor.find({});
}
