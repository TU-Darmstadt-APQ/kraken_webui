import * as fs from "fs";
import {
  tinkerforgeDTO,
  tinkerforgeEntitySchema as tinkerforgeSensorSchema,
} from "@/models/zTinkerforgeSensor.schema";
import { EJSON } from "bson";
import { z } from "zod";

describe("TinkerforgeSensor Schema Validation", () => {
  it("should validate valid TinkerforgeSensor data against the database schema", () => {
    // Load dummy data for a TinkerforgeSensor from a file to test the schema validator
    const tinkerforgeSensorData = EJSON.parse(
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

describe("Tinkerforge UID Validation", () => {
  const uidSchema = tinkerforgeSensorSchema.pick({ uid: true });

  it("should accept valid uid values", () => {
    const validUIDs = [0, 1, 12345, 4294967295];
    validUIDs.forEach((uid) => {
      expect(() => uidSchema.parse({ uid })).not.toThrow();
    });
  });

  it("should reject invalid uid values", () => {
    const invalidUIDs = [
      -1,
      4294967296,
      3.14,
      "string",
      null,
      undefined,
      {},
      [],
    ];
    invalidUIDs.forEach((uid) => {
      expect(() => uidSchema.parse({ uid })).toThrow(z.ZodError);
    });
  });
});
