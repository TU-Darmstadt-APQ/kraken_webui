import { z } from "zod";
import functionCallSchema from "./FunctionCall.schema";

// Defines the schema for the sensor configuration used by the Labnode sensors
export const labnodeConfigSchema = z.object({
  interval: z.number().int().nonnegative(),
  description: z.union([z.string(), z.null()]),
  topic: z.string(),
  unit: z.string(),
  timeout: z.union([z.number().int().nonnegative(), z.null()]),
});

// Defines the schema for a Labnode sensor as used by the Mongo database
export const labnodeEntitySchema = z.object({
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
  uid: z.number().int().nonnegative(),
  config: z.record(z.string(), labnodeConfigSchema),
  on_connect: z.array(functionCallSchema),
});

export type labnodeEntity = z.infer<typeof labnodeEntitySchema>;

// The Data Transfer Object (DTO) for the Labnode sensor
// as used by the application
export const labnodeDTOSchema = z.object({
  id: z.string().uuid(),
  date_created: z.string().datetime(),
  date_modified: z.string().datetime(),
  enabled: labnodeEntitySchema.shape.enabled,
  label: labnodeEntitySchema.shape.label,
  description: labnodeEntitySchema.shape.description,
  uid: labnodeEntitySchema.shape.uid,
  config: z.record(z.string(), labnodeConfigSchema),
  on_connect: labnodeEntitySchema.shape.on_connect,
});

export type labnodeDTO = z.infer<typeof labnodeDTOSchema>;

export const labnodeDTO = {
  convertFromEntity(entity: labnodeEntity): labnodeDTO {
    const candidate: labnodeDTO = {
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

    return labnodeDTOSchema.parse(candidate);
  },
};
