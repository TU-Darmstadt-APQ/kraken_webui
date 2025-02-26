"use server"; // Mark this as a server action

import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";
import { upsertSensor } from "@/components/mongodb/DBConnector";

/**
 * Upserts a sensor using the provided sensor data transfer object (DTO).
 *
 * This function handles both creating a new sensor and updating an existing sensor.
 * If the sensor with the given ID already exists, its information is updated; otherwise,
 * a new sensor is inserted. For a new sensor, ensure that a unique `id` is generated and
 * the appropriate `date_created` (if not provided, the current date will be used).
 *
 * @param {tinkerforgeDTO} sensorDTO - The sensor data to be inserted.
 * @returns {Promise<{ success: boolean; message: string }>}
 *          A promise resolving to an object indicating success or failure.
 *          - On success: `{ success: true, message: "Sensor upserted successfully" }`
 *          - On failure: `{ success: false, message: "Failed to upsert sensor" }`
 *
 * @description
 * If the upsertion fails, the function catches the error and logs it, returning a failure message instead of throwing an exception.
 * Possible failure reasons include:
 * - `MongoWriteException`: Write failure due to a specific write exception.
 * - `MongoWriteConcernException`: Failure due to unmet write concern.
 * - `MongoCommandException`: Write failure caused by a command exception.
 * - `MongoException`: General MongoDB-related failure.
 * - `ZodIssue`: Schema validation failure for `sensorDTO`.
 */
export async function upsertSensorAction(sensorDTO: tinkerforgeDTO) {
  try {
    await upsertSensor(sensorDTO);
    return { success: true, message: "Sensor upserted successfully" };
  } catch {
    return { success: false, message: "Failed to upsert sensor" };
  }
}
