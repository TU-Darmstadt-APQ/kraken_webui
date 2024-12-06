import { config } from "../config";
import mongoose from "mongoose";

async function StartSetup() {
  console.log("Starting MongoDB connection...");
  await mongoose.connect(`${config.krakenConfigsMongodbConnectionString}`);
  console.log("Connection with MongoDB successfully established.");
  // mongoose.connection.on('error', (err : any) => console.log("Catch Connection Error:", err));

}


async function run() {
  try {
    console.log("Starting ping test...")
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    console.log("Disconnecting from MongoDB...")
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.log(error)
    }
    console.log("Disconnected.");
  }
}


export default async function DBConnector() {
  try {
    await StartSetup();
    await run();
  } catch (error) {
    console.log("Catch Error:", error);
  }

  return (
    <span></span>
  )
}
