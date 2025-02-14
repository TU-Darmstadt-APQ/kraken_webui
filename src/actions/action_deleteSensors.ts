"use server";
import {
  tinkerforgeDTO,
  tinkerforgeDTOSchema,
} from "@/models/zTinkerforgeSensor.schema";
import { ResponseType } from "@/types";
import { deleteSensor } from "@/components/mongodb/DBConnector";

export async function deleteSensorAction(sensorDTO: tinkerforgeDTO) {
  try {
    // Call deleteSensor with the tinkerforgeDTO object
    const response: ResponseType = await deleteSensor(sensorDTO);
    return { success: true, message: response.message }; // Return success response
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
