import { z } from 'zod';

const configSchema = z.record(
  z.string(),
  z.object({
    interval: z.number(),
    trigger_only_on_change: z.boolean(),
    description: z.string(),
    topic: z.string(),
    unit: z.string()
  })
);

const tinkerforgeSensorSchema = z.object({
  _id: z.object({
    $binary: z.object({
      base64: z.string(),
      subType: z.string()
    })
  }),
  date_created: z.object({
    $date: z.string().datetime()
  }),
  date_modified: z.object({
    $date: z.string().datetime()
  }),
  enabled: z.boolean(),
  label: z.union([z.string(), z.null()]),
  description: z.string(),
  uid: z.number(),
  config: configSchema,
  on_connect: z.array(
    z.object({
      function: z.string(),
      args: z.array(z.any()),
      kwargs: z.record(z.string(), z.any()),
      timeout: z.union([z.number(), z.null()])
    })
  )
});

export default tinkerforgeSensorSchema;