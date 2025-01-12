import { z } from "zod";
import functionCallSchema from "./FunctionCall.schema";

// Defines the schema for the sensor configuration used by the Tinkerforge sensors
export const tinkerforgeConfigSchema = z.object({
  interval: z.number().int().nonnegative(),
  trigger_only_on_change: z.boolean(),
  description: z.optional(z.string()),
  topic: z.string(),
  unit: z.string(),
});

// Defines the schema for a Tinkerforge sensor as used by the Mongo
// database
export const tinkerforgeEntitySchema = z.object({
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

export type tinkerforgeEntity = z.infer<typeof tinkerforgeEntitySchema>;

// The Data Transfer Object (DTO) for the Tinkerforge sensor
// as used by the application
export const tinkerforgeDTOSchema = z.object({
  id: z.string().uuid(),
  date_created: z.string().datetime(),
  date_modified: z.string().datetime(),
  enabled: tinkerforgeEntitySchema.shape.enabled,
  label: tinkerforgeEntitySchema.shape.label,
  description: tinkerforgeEntitySchema.shape.description,
  uid: tinkerforgeEntitySchema.shape.uid,
  config: z.record(z.string(), tinkerforgeConfigSchema), // zod does not like recursive types: https://github.com/colinhacks/zod#recursive-types
  on_connect: tinkerforgeEntitySchema.shape.on_connect,
});

export type tinkerforgeDTO = z.infer<typeof tinkerforgeDTOSchema>;

export const tinkerforgeDTO = {
  convertFromEntity(entity: tinkerforgeEntity): tinkerforgeDTO {
    const candidate: tinkerforgeDTO = {
      id: entity._id.$uuid,
      date_created: entity.date_created.$date,
      date_modified: entity.date_modified.$date,
      enabled: entity.enabled,
      label: entity.label,
      description: entity.description,
      uid: entity.uid,
      config: entity.config,
      on_connect: entity.on_connect,
    };

    return tinkerforgeDTOSchema.parse(candidate);
  },
};
