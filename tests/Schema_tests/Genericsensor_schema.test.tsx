import * as fs from "fs";
import { genericDTO, genericEntitySchema } from "@/models/GenericSensor.schema";
import { EJSON } from "bson";
import { z } from "zod";

describe("GenericSensor Schema Validation", () => {
  it("should validate valid GenericSensor data against the database schema", () => {
    // Load dummy data for a GenericSensor from a file to test the schema validator
    const genericSensorData = EJSON.parse(
      fs.readFileSync("./tests/mongo/data/GenericSensor.json", "utf8"),
    );
    // Use expect to assert that the data is valid
    expect(() => {
      const data = genericEntitySchema.parse(genericSensorData);
      genericDTO.convertFromEntity(data);
    }).not.toThrow();
  });

  it("should throw an error for invalid GenericSensor data", () => {
    // Create invalid data (e.g., missing required field, incorrect type)
    const invalidGenericSensorData = {};
    // Use expect to assert that an error is thrown
    expect(() => {
      genericEntitySchema.parse(invalidGenericSensorData);
    }).toThrow(z.ZodError);
  });
});
