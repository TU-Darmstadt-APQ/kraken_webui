import * as fs from "fs";
import { labnodeDTO, labnodeEntitySchema } from "@/models/LabnodeSensor.schema";
import { EJSON } from "bson";
import { z } from "zod";

describe("LabnodeSensor Schema Validation", () => {
  it("should validate valid LabnodeSensor data against the database schema", () => {
    // Load dummy data for a LabnodeSensor from a file to test the schema validator
    const labnodeSensorData = EJSON.parse(
      fs.readFileSync("./tests/mongo/data/LabnodeSensor.json", "utf8"),
    );
    // Use expect to assert that the data is valid
    expect(() => {
      const data = labnodeEntitySchema.parse(labnodeSensorData);
      labnodeDTO.convertFromEntity(data);
    }).not.toThrow();
  });

  it("should throw an error for invalid LabnodeSensor data", () => {
    // Create invalid data (e.g., missing required field, incorrect type)
    const invalidLabnodeSensorData = {};
    // Use expect to assert that an error is thrown
    expect(() => {
      labnodeEntitySchema.parse(invalidLabnodeSensorData);
    }).toThrow(z.ZodError);
  });
});
