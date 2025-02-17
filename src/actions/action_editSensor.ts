"use server";

import { editSensor } from "@/components/mongodb/DBConnector"; // Adjust the import path as needed
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";

/**
 * Server action to edit the description of a sensor.
 *
 * @param {tinkerforgeDTO} sensorDTO - The sensor data transfer object containing the ID of the sensor to be edited.
 * @param {string} newDescription - The new description to be set for the sensor.
 * @returns {Promise<{ success: boolean; message: string }>} A response object indicating success or failure.
 */
export async function editSensorAction(
  sensorDTO: tinkerforgeDTO,
  newDescription: string,
): Promise<{ success: boolean; message: string }> {
  try {
    // Call editSensorDescription with the tinkerforgeDTO object and new description
    await editSensor(sensorDTO, newDescription);
    return {
      success: true,
      message: `Sensor ${sensorDTO.id} description updated successfully.`,
    }; // Return success response
  } catch (error: unknown) {
    // Handle errors and provide a friendly message
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return {
      success: false,
      message:
        "An unknown error occurred while updating the sensor description",
    };
  }
}
