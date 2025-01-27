import { z } from "zod";

// Defines the schema for a sensor host as used by the Mongo database
export const sensorHostEntitySchema = z.object({
  _id: z.object({
    $uuid: z.string().uuid(),
  }),
  hostname: z.string(),
  port: z.number().int().nonnegative(),
  pad: z.union([z.number().int().nonnegative(), z.null()]),
  sad: z.union([z.number().int().nonnegative(), z.null()]),
  driver: z.string(),
  node_id: z.object({
    $uuid: z.string().uuid(),
  }),
  reconnect_interval: z.union([z.number().int().nonnegative(), z.null()]),
  revision_id: z.optional(
    z.object({
      $uuid: z.string().uuid(),
    }),
  ),
  date_created: z.object({
    $date: z.string().datetime(),
  }),
  date_modified: z.object({
    $date: z.string().datetime(),
  }),
  enabled: z.boolean(),
  label: z.optional(z.union([z.string(), z.null()])),
  description: z.union([z.string(), z.null()]),
});

export type sensorHostEntity = z.infer<typeof sensorHostEntitySchema>;

// The Data Transfer Object (DTO) for the sensor host
// as used by the application
export const sensorHostDTOSchema = z.object({
  id: z.string().uuid(),
  hostname: z.string(),
  port: z.number().int().nonnegative(),
  pad: z.union([z.number().int().nonnegative(), z.null()]),
  sad: z.union([z.number().int().nonnegative(), z.null()]),
  driver: z.string(),
  node_id: z.string().uuid(),
  reconnect_interval: z.union([z.number().int().nonnegative(), z.null()]),
  date_created: z.string().datetime(),
  date_modified: z.string().datetime(),
  enabled: z.boolean(),
  label: z.optional(z.union([z.string(), z.null()])),
  description: z.union([z.string(), z.null()]),
});

export type sensorHostDTO = z.infer<typeof sensorHostDTOSchema>;

export const sensorHostDTO = {
  convertFromEntity(entity: sensorHostEntity): sensorHostDTO {
    const candidate: sensorHostDTO = {
      id: entity._id.$uuid,
      hostname: entity.hostname,
      port: entity.port,
      pad: entity.pad,
      sad: entity.sad,
      driver: entity.driver,
      node_id: entity.node_id.$uuid,
      reconnect_interval: entity.reconnect_interval,
      revision_id: entity.revision_id?.$uuid,
      date_created: entity.date_created.$date,
      date_modified: entity.date_modified.$date,
      enabled: entity.enabled,
      label: entity.label,
      description: entity.description,
    };

    return sensorHostDTOSchema.parse(candidate);
  },
};
