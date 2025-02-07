"use server";
import { deleteSensor } from "@/components/mongodb/DBConnector";
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";

export async function deleteSensorAction(uuid: string) {
  try {
    // Create a tinkerforgeDTO object with the provided UUID
    const sensorDTO: tinkerforgeDTO = {
      id: uuid, // Set the id to the provided UUID string
      date_created: "", // Add default or required values for other fields
      date_modified: "",
      enabled: true,
      description: null,
      uid: 0,
      config: {},
      on_connect: [],
    };

    // Call deleteSensor with the tinkerforgeDTO object
    const message = await deleteSensor(sensorDTO);
    return { success: true, message }; // Return success response
  } catch (error: unknown) {
    // Handle errors and provide a friendly message
    console.error("Error deleting sensor:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return {
      success: false,
      message: "An unknown error occurred while deleting the sensor",
    };
  }
}
