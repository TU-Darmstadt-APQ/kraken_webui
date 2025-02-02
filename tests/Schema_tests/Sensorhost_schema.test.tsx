import * as fs from "fs";
import {
  sensorHostDTO,
  sensorHostEntitySchema,
} from "@/models/SensorHost.schema";
import { EJSON } from "bson";
import { z } from "zod";

describe("SensorHost Schema Validation", () => {
  it("should validate valid SensorHost data against the database schema", () => {
    // Load dummy data for a SensorHost from a file to test the schema validator
    const sensorHostData = EJSON.parse(
      fs.readFileSync("./tests/mongo/data/SensorHost.json", "utf8"),
    );
    // Use expect to assert that the data is valid
    expect(() => {
      const data = sensorHostEntitySchema.parse(sensorHostData);
      sensorHostDTO.convertFromEntity(data);
    }).not.toThrow();
  });

  it("should throw an error for invalid SensorHost data", () => {
    // Create invalid data (e.g., missing required field, incorrect type)
    const invalidSensorHostData = {};
    // Use expect to assert that an error is thrown
    expect(() => {
      sensorHostEntitySchema.parse(invalidSensorHostData);
    }).toThrow(z.ZodError);
  });
});
