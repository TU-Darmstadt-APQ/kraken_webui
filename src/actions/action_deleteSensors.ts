"use server";
import { deleteSensor } from "@/components/mongodb/DBConnector";
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";

export async function deleteSensorAction(sensorDTO: tinkerforgeDTO) {
  try {
    // Call deleteSensor with the tinkerforgeDTO object
    await deleteSensor(sensorDTO);
    return { success: true, message: `Sensor ${sensorDTO.id} deleted.` }; // Return success response
  } catch (error: unknown) {
    // Handle errors and provide a friendly message
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return {
      success: false,
      message: "An unknown error occurred while deleting the sensor",
    };
  }
}
