"use server";

import { editSensorConfig } from "@/components/mongodb/DBConnector";
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";

export async function editSensorConfigAction(
  sensorId: string,
  updatedConfig: Partial<tinkerforgeDTO>,
) {
  try {
    const message = await editSensorConfig(sensorId, updatedConfig);
    return { success: true, message };
  } catch (error) {
    console.error("Error editing sensor configuration:", error);
    return { success: false, message: "Failed to edit sensor configuration" };
  }
}
