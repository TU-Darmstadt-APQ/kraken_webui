import { UUID } from "bson";
import { z } from "zod";

// Defines the schema for a sensor host as used by the Mongo database
export const sensorHostEntitySchema = z.object({
  _id: z.instanceof(UUID),
  hostname: z.string().regex(
    // TODO: This regex only validates hostnames. It does not validate IPv4 and fails for IPv6.
    /^((?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?)$/,
    "Invalid hostname format",
  ),
  port: z.number().int().min(1).max(65535),
  pad: z.union([z.number().int().min(1).max(30), z.null()]), // GPIB primary address see http://www.ni.com/pdf/manuals/370428c.pdf, p. A-2 for details
  sad: z.union([z.literal(0), z.number().int().min(0x60).max(0x7e), z.null()]), // GPIB secondary address
  driver: z.string(),
  node_id: z.instanceof(UUID),
  reconnect_interval: z.union([z.number().int().nonnegative(), z.null()]),
  revision_id: z.optional(z.instanceof(UUID)),
  date_created: z.instanceof(Date),
  date_modified: z.instanceof(Date),
  enabled: z.boolean(),
  label: z.optional(z.union([z.string(), z.null()])),
  description: z.union([z.string(), z.null()]),
});

export type sensorHostEntity = z.infer<typeof sensorHostEntitySchema>;

// The Data Transfer Object (DTO) for the sensor host
// as used by the application
export const sensorHostDTOSchema = z.object({
  id: z.string().uuid(),
  hostname: sensorHostEntitySchema.shape.hostname,
  port: sensorHostEntitySchema.shape.port,
  pad: sensorHostEntitySchema.shape.pad,
  sad: sensorHostEntitySchema.shape.sad,
  driver: sensorHostEntitySchema.shape.driver,
  // node_id is converted from a UUID instance to a string
  node_id: z.string().uuid(),
  reconnect_interval: sensorHostEntitySchema.shape.reconnect_interval,
  // Dates converted to ISO strings
  date_created: z.string().datetime(),
  date_modified: z.string().datetime(),
  enabled: sensorHostEntitySchema.shape.enabled,
  label: sensorHostEntitySchema.shape.label,
  description: sensorHostEntitySchema.shape.description,
});

export type sensorHostDTO = z.infer<typeof sensorHostDTOSchema>;

export const sensorHostDTO = {
  convertFromEntity(entity: sensorHostEntity): sensorHostDTO {
    const candidate: sensorHostDTO = {
      id: entity._id.toString(),
      hostname: entity.hostname,
      port: entity.port,
      pad: entity.pad,
      sad: entity.sad,
      driver: entity.driver,
      node_id: entity.node_id.toString(),
      reconnect_interval: entity.reconnect_interval,
      date_created: entity.date_created.toISOString(),
      date_modified: entity.date_modified.toISOString(),
      enabled: entity.enabled,
      label: entity.label,
      description: entity.description,
    };
    return sensorHostDTOSchema.parse(candidate);
  },
};
