import { z } from "zod";
import * as fs from "fs";
import {
  tinkerforgeEntitySchema as tinkerforgeSensorSchema,
  tinkerforgeDTO,
} from "@/models/zTinkerforgeSensor.schema";

describe("TinkerforgeSensor Schema Validation", () => {
  it("should validate valid TinkerforgeSensor data against the database schema", () => {
    // Load dummy data for a TinkerforgeSensor from a file to test the schema validator
    const tinkerforgeSensorData = JSON.parse(
      fs.readFileSync("./tests/mongo/data/TinkerforgeSensor.json", "utf8"),
    );

    // Use expect to assert that the data is valid
    expect(() => {
      var data = tinkerforgeSensorSchema.parse(tinkerforgeSensorData);
      tinkerforgeDTO.convertFromEntity(data);
    }).not.toThrow();
  });

  it("should throw an error for invalid TinkerforgeSensor data", () => {
    // Create invalid data (e.g., missing required field, incorrect type)
    const invalidTinkerforgeSensorData = {};

    // Use expect to assert that an error is thrown
    expect(() => {
      tinkerforgeSensorSchema.parse(invalidTinkerforgeSensorData);
    }).toThrow(z.ZodError);
  });
});
