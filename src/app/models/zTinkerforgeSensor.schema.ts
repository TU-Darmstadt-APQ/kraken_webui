import { z } from "zod";
import functionCallSchema from "./FunctionCall.schema";

// Defines the schema for the sensor configuration used by the Tinkerforge sensors
const tinkerforgeConfigSchema = z.object({
  interval: z.number().int().nonnegative(),
  trigger_only_on_change: z.boolean(),
  description: z.optional(z.string()),
  topic: z.string(),
  unit: z.string(),
});

// Defines the schema for a Tinkerforge sensor
const tinkerforgeSensorSchema = z.object({
  _id: z.object({
    $uuid: z.string().uuid(),
  }),
  date_created: z.object({
    $date: z.string().datetime(),
  }),
  date_modified: z.object({
    $date: z.string().datetime(),
  }),
  enabled: z.boolean(),
  label: z.union([z.string(), z.null()]),
  description: z.optional(z.string()),
  uid: z
    .number()
    .int()
    .min(0, { message: "Value must be non-negative" }) // Ensures it's non-negative (unsigned)
    .max(4294967295, { message: "Value exceeds uint32_t limit" }), // (uint32_t)
  config: z.record(z.string(), tinkerforgeConfigSchema),
  on_connect: z.array(functionCallSchema),
});

export default tinkerforgeSensorSchema;
