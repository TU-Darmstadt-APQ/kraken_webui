"use server"; // Mark this as a server action

import { insertSensor } from "@/components/mongodb/DBConnector";
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";

export async function insertSensorAction(sensorDTO: tinkerforgeDTO) {
  try {
    await insertSensor(sensorDTO);
    return { success: true, message: "Sensor inserted successfully" };
  } catch (error) {
    console.error("Error inserting sensor:", error);
    return { success: false, message: "Failed to insert sensor" };
  }
}
