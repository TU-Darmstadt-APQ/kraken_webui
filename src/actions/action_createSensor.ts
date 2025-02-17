"use server"; // Mark this as a server action

import { insertSensor } from "@/components/mongodb/DBConnector";
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";

/**
 * Inserts a sensor using the provided sensor data transfer object (DTO).
 * 
 * @param {tinkerforgeDTO} sensorDTO - The sensor data to be inserted.
 * @returns {Promise<{ success: boolean; message: string }>} 
 *          A promise resolving to an object indicating success or failure.
 *          - On success: `{ success: true, message: "Sensor inserted successfully" }`
 *          - On failure: `{ success: false, message: "Failed to insert sensor" }`
 * 
 * @description
 * If the insertion fails, the function catches the error and logs it, returning a failure message instead of throwing an exception.
 * Possible failure reasons include:
 * - `MongoWriteException`: Write failure due to a specific write exception.
 * - `MongoWriteConcernException`: Failure due to unmet write concern.
 * - `MongoCommandException`: Write failure caused by a command exception.
 * - `MongoException`: General MongoDB-related failure.
 * - `ZodIssue`: Schema validation failure for `sensorDTO`.
 */
export async function insertSensorAction(sensorDTO: tinkerforgeDTO) {
  try {
    await insertSensor(sensorDTO);
    return { success: true, message: "Sensor inserted successfully" };
  } catch (error) {
    console.error("Error inserting sensor:", error);
    return { success: false, message: "Failed to insert sensor" };
  }
}
