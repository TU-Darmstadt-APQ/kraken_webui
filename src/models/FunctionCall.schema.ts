import { z } from "zod";

//schema for FunctionCall
const functionCallSchema = z.object({
  function: z.string(),
  args: z.array(z.any()),
  kwargs: z.record(z.string(), z.any()),
  timeout: z.union([z.number().nonnegative(), z.null()]),
});

export default functionCallSchema;
