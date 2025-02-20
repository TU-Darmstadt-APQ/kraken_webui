import { UUID } from "mongodb";
import functionCallSchema from "./FunctionCall.schema";
import { z } from "zod";

// Defines the schema for the sensor configuration used by the Tinkerforge sensors
export const tinkerforgeConfigSchema = z.object({
  interval: z.number().int().nonnegative(),
  trigger_only_on_change: z.boolean(),
  description: z.union([z.string(), z.null()]),
  topic: z.string(),
  unit: z.string(),
});

// Defines the schema for a Tinkerforge sensor as used by the Mongo
// database
export const tinkerforgeEntitySchema = z.object({
  _id: z.instanceof(UUID),
  date_created: z.instanceof(Date),
  date_modified: z.instanceof(Date),
  enabled: z.boolean(),
  label: z.optional(z.union([z.string(), z.null()])),
  description: z.union([z.string(), z.null()]),
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
      id: entity._id.toString(),
      date_created: entity.date_created.toISOString(),
      date_modified: entity.date_modified.toISOString(),
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

/**
 *
 * @param DTO to be converted to entity
 * @returns entity of the given DTO
 */
export function convertToEntity(DTO: tinkerforgeDTO): tinkerforgeEntity {
  const candidate: tinkerforgeEntity = {
    _id: new UUID(DTO.id),
    date_created: new Date(DTO.date_created),
    date_modified: new Date(DTO.date_modified),
    enabled: DTO.enabled,
    label: DTO.description,
    description: DTO.description,
    uid: DTO.uid,
    config: DTO.config,
    on_connect: DTO.on_connect,
  };
  tinkerforgeEntitySchema.parse(candidate);
  return candidate;
}
