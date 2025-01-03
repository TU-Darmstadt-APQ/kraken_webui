import { z } from "zod";

// Defines the schema for the sensor configuration used by the Tinkerforge sensors
const tinkerforgeConfigSchema = z.record(
  z.string(),
  z.object({
    interval: z.number(),
    trigger_only_on_change: z.boolean(),
    description: z.string(),
    topic: z.string(),
    unit: z.string(),
  }),
);

// Defines the schema for a Tinkerforge sensor
const tinkerforgeSensorSchema = z.object({
  _id: z.string().uuid(),
  date_created: z.object({
    $date: z.string().datetime(),
  }),
  date_modified: z.object({
    $date: z.string().datetime(),
  }),
  enabled: z.boolean(),
  label: z.union([z.string(), z.null()]),
  description: z.string(),
  uid: z.number().int().nonnegative(),
  config: tinkerforgeConfigSchema,
  on_connect: z.array(
    z.object({
      function: z.string(),
      args: z.array(z.any()),
      kwargs: z.record(z.string(), z.any()),
      timeout: z.union([z.number().int().nonnegative(), z.null()]),
    }),
  ),
});

export default tinkerforgeSensorSchema;
