import { UUID } from "bson";
import functionCallSchema from "./FunctionCall.schema";
import { z } from "zod";

// Defines the schema for a Generic sensor as used by the Mongo database
export const genericEntitySchema = z.object({
  _id: z.instanceof(UUID),
  date_created: z.instanceof(Date),
  date_modified: z.instanceof(Date),
  enabled: z.boolean(),
  label: z.optional(z.union([z.string(), z.null()])),
  description: z.union([z.string(), z.null()]),
  host: z.instanceof(UUID),
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
  host: z.string().uuid(),
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
      id: entity._id.toString(),
      date_created: entity.date_created.toISOString(),
      date_modified: entity.date_modified.toISOString(),
      enabled: entity.enabled,
      label: entity.label,
      description: entity.description,
      host: entity.host.toString(),
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
