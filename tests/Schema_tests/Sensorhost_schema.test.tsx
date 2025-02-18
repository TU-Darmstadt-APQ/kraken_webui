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

describe("SensorHost Hostname Validation", () => {
  const hostnameSchema = sensorHostEntitySchema.pick({ hostname: true });

  it("should accept valid hostnames", () => {
    const validHostnames = ["example.com", "sub-domain.example.com", "a.com"];

    validHostnames.forEach((hn) => {
      expect(() => hostnameSchema.parse({ hostname: hn })).not.toThrow();
    });
  });

  it("should reject invalid hostnames", () => {
    const invalidHostnames = [
      "",
      "invalid_hostname!",
      "a".repeat(256) + ".com", // hostname too long
      "-startdash.com", // hostname starting with a dash (check if rejected by regex)
      "enddash-.com", // hostname ending with a dash (check if rejected by regex)
      "foo@bar.com",  // Emails are not hostnames
    ];

    invalidHostnames.forEach((hn) => {
      expect(() => hostnameSchema.parse({ hostname: hn })).toThrow(z.ZodError);
    });
  });
});

describe("SensorHost SAD Validation", () => {
  const sadSchema = sensorHostEntitySchema.pick({ sad: true });

  it("should accept valid 'sad' values", () => {
    const validSadValues = [0, 96, 100, 126, null];
    validSadValues.forEach((val) => {
      expect(() => sadSchema.parse({ sad: val })).not.toThrow();
    });
  });

  it("should reject invalid 'sad' values", () => {
    // Invalid values: negatives, numbers between 1 and 95 that are not 0, numbers above 126,
    // decimals, and non-numeric types
    const invalidSadValues = [-1, 50, 127, 95, 200, 3.14, "string", {}];
    invalidSadValues.forEach((val) => {
      expect(() => sadSchema.parse({ sad: val })).toThrow(z.ZodError);
    });
  });
});
