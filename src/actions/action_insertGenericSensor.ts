"use server";

import { genericDTO } from "@/models/GenericSensor.schema";
import { insertGenericSensor } from "@/components/mongodb/DBConnector";

export async function insertGenericSensorAction(sensorDTO: genericDTO) {
  try {
    await insertGenericSensor(sensorDTO);
    return { success: true, message: "Generic sensor inserted successfully" };
  } catch (error) {
    console.error("Error inserting generic sensor:", error);
    return { success: false, message: "Failed to insert generic sensor" };
  }
}
