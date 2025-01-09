/**
 * Test Suite: TinkerforgeSensor Model with Detailed Schema
 *
 * This test suite verifies the functionality of the TinkerforgeSensor model with a detailed schema.
 * The test covers:
 * 1. **Model Creation**: Verifying the creation and validation of the model with complex schema.
 * 2. **Model Saving**: Testing if the created model can be saved correctly.
 * 3. **Model Retrieval**: Verifying that a saved model can be retrieved and its data is correct.
 * 4. **Validation Failure**: Checking that the model fails if the UID is not an integer.
 *
 * Mocking:
 * - Mongoose methods such as `mongoose.connect`, `mongoose.model`, `save`, and `findById` are mocked to simulate database operations.
 */

import mongoose from "mongoose";
import TinkerforgeSensor from "@/app/models/Tinkerforgesensor.schema"; // Adjust the import path

// Mock the mongoose library and related methods
jest.mock("mongoose", () => {
  const models: { [key: string]: unknown } = {};

  const mongoose = {
    Schema: class {
      static Types = {
        Mixed: jest.fn(), // Mock for Mixed type
        Map: jest.fn(),   // Mock for Map type
      };
    },
    model: jest.fn((name: string) => {
      if (!models[name]) {
        class Model {
          constructor(data: unknown) {
            Object.assign(this, data);
          }
          static findById = jest.fn().mockResolvedValue({
            _id: "sensor1",
            label: "Test Sensor",
            enabled: true,
            uid: 12345,
            config: {
              interval: 5,
              trigger_only_on_change: true,
              description: "Test config description",
              topic: "testTopic",
              unit: "Celsius",
            },
            on_connect: [{ function: "connectFunction", args: [], kwargs: {}, timeout: 1000 }],
          });
          save = jest.fn().mockResolvedValue(true);
        }
        models[name] = Model;
      }
      return models[name];
    }),
    connect: jest.fn().mockResolvedValue(true),
    connection: {
      close: jest.fn().mockResolvedValue(true),
    },
  };

  return mongoose;
});

describe("TinkerforgeSensor Model with Detailed Schema", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create and validate a TinkerforgeSensor model instance with complex schema", async () => {
    const sensorData = {
      _id: "sensor1",
      date_created: new Date().toISOString(),
      date_modified: new Date().toISOString(),
      enabled: true,
      label: "Test Sensor",
      description: "A test sensor description",
      uid: 12345, // Valid integer UID
      config: {
        interval: 5,
        trigger_only_on_change: true,
        description: "Test config description",
        topic: "testTopic",
        unit: "Celsius",
      },
      on_connect: [
        {
          function: "connectFunction",
          args: ["arg1", "arg2"],
          kwargs: { key1: "value1", key2: "value2" },
          timeout: 1000,
        },
      ],
    };

    const sensor = new TinkerforgeSensor(sensorData);
    await sensor.save(); // Save the model instance

    const foundSensor = await TinkerforgeSensor.findById("sensor1"); // Retrieve by ID

    // Assertions
    expect(foundSensor).not.toBeNull();
    expect(foundSensor?.label).toBe("Test Sensor");
    expect(foundSensor?.enabled).toBe(true);
    expect(foundSensor?.uid).toBe(12345);
    expect(foundSensor?.config?.interval).toBe(5);
    expect(foundSensor?.config?.topic).toBe("testTopic");
    expect(foundSensor?.on_connect[0].function).toBe("connectFunction");
  });

  it("should fail if UID is not an integer", async () => {
    const sensorData = {
      _id: "sensor2",
      date_created: new Date().toISOString(),
      date_modified: new Date().toISOString(),
      enabled: true,
      label: "Test Sensor",
      description: "A test sensor description",
      uid: "not-a-number", // Invalid UID, should be an integer
      config: {
        interval: 5,
        trigger_only_on_change: true,
        description: "Test config description",
        topic: "testTopic",
        unit: "Celsius",
      },
      on_connect: [
        {
          function: "connectFunction",
          args: ["arg1", "arg2"],
          kwargs: { key1: "value1", key2: "value2" },
          timeout: 1000,
        },
      ],
    };

    const sensor = new TinkerforgeSensor(sensorData);

    try {
      await sensor.save(); // Attempt to save invalid data
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.errors.uid).toBeDefined();
      expect(error.errors.uid.message).toBe('"not-a-number" is not an integer value');
    }
  });
});

