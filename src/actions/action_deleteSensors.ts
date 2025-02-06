"use server";
import { UUID } from "bson";
import { deleteSensor } from "@/components/mongodb/DBConnector";

export async function deleteSensorAction(uuid: string) {
  try {
    const message = await deleteSensor(new UUID(uuid));
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
