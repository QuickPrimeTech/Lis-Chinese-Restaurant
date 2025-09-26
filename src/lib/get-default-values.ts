import { z, ZodTypeAny } from "zod";

/**
 * Generate default values for a Zod object schema
 */
export function getDefaultValues<T extends ZodTypeAny>(schema: T): z.infer<T> {
  const shape = (schema as any).shape;
  const defaults: any = {};

  for (const key in shape) {
    const field = shape[key];
    if (field instanceof z.ZodString) defaults[key] = "";
    else if (field instanceof z.ZodNumber) defaults[key] = 0;
    else if (field instanceof z.ZodBoolean) defaults[key] = false;
    else if (field instanceof z.ZodArray) defaults[key] = [];
    else if (field instanceof z.ZodNullable) defaults[key] = null;
    else defaults[key] = null;
  }

  return defaults;
}
