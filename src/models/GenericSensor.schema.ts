import { z } from "zod";
import functionCallSchema from "./FunctionCall.schema";

// Defines the schema for a Generic sensor as used by the Mongo database
export const genericEntitySchema = z.object({
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
  label: z.optional(z.union([z.string(), z.null()])),
  description: z.union([z.string(), z.null()]),
  host: z.object({
    $uuid: z.string().uuid(),
  }),
  driver: z.string(),
  interval: z.number().int().nonnegative(),
  on_connect: z.array(functionCallSchema),
  on_read: functionCallSchema,
  on_after_read: z.array(functionCallSchema),
  on_disconnect: z.array(functionCallSchema),
  topic: z.string(),
  unit: z.string(),
});

export type genericEntity = z.infer<typeof genericEntitySchema>;

// The Data Transfer Object (DTO) for the Generic sensor
// as used by the application
export const genericDTOSchema = z.object({
  id: z.string().uuid(),
  date_created: z.string().datetime(),
  date_modified: z.string().datetime(),
  enabled: genericEntitySchema.shape.enabled,
  label: genericEntitySchema.shape.label,
  description: genericEntitySchema.shape.description,
  host: genericEntitySchema.shape.host,
  driver: genericEntitySchema.shape.driver,
  interval: genericEntitySchema.shape.interval,
  on_connect: genericEntitySchema.shape.on_connect,
  on_read: genericEntitySchema.shape.on_read,
  on_after_read: genericEntitySchema.shape.on_after_read,
  on_disconnect: genericEntitySchema.shape.on_disconnect,
  topic: genericEntitySchema.shape.topic,
  unit: genericEntitySchema.shape.unit,
});

export type genericDTO = z.infer<typeof genericDTOSchema>;

export const genericDTO = {
  convertFromEntity(entity: genericEntity): genericDTO {
    const candidate: genericDTO = {
      id: entity._id.$uuid,
      date_created: entity.date_created.$date,
      date_modified: entity.date_modified.$date,
      enabled: entity.enabled,
      label: entity.label,
      description: entity.description,
      host: entity.host,
      driver: entity.driver,
      interval: entity.interval,
      on_connect: entity.on_connect,
      on_read: entity.on_read,
      on_after_read: entity.on_after_read,
      on_disconnect: entity.on_disconnect,
      topic: entity.topic,
      unit: entity.unit,
    };

    return genericDTOSchema.parse(candidate);
  },
};
