// Validates the TinkerforgeSensor data against the schema defined in TinkerforgeSensor.schema.ts
import { z } from "zod";
import * as fs from "fs";
import tinkerforgeSensorSchema from "@/app/schema/TinkerforgeSensor.schema";

// Load dummy data for a TinkerforgeSensor from a file to test the schema validator
const tinkerforgeSensorData = JSON.parse(
  fs.readFileSync("./tests/data/TinkerforgeSensor.json", "utf8"), // Read the JSON data from the file and parse it into a JavaScript object
);

try {
  const validatedTinkerforgeData = tinkerforgeSensorSchema.parse(
    tinkerforgeSensorData,
  );

  // If the data is valid, It can be used here
  console.log("Validated TinkerforgeSensor Data:", validatedTinkerforgeData);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error("Validation Error:", error.errors);
  } else {
    console.error("An unexpected error occurred:", error);
  }
}
