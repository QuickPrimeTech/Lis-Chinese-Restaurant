import { z, ZodObject, ZodRawShape } from "zod";

/**
 * Generate default values for a Zod object schema
 */
export function getDefaultValues<T extends ZodObject<ZodRawShape>>(
  schema: T
): z.infer<T> {
  const shape = schema.shape;

  // Start with an empty object and assert it as z.infer<T> at the end
  const defaults: Partial<Record<keyof typeof shape, unknown>> = {};

  Object.keys(shape).forEach((key) => {
    const field = shape[key as keyof typeof shape];

    if (field instanceof z.ZodString) defaults[key as keyof typeof shape] = "";
    else if (field instanceof z.ZodNumber)
      defaults[key as keyof typeof shape] = 0;
    else if (field instanceof z.ZodBoolean)
      defaults[key as keyof typeof shape] = false;
    else if (field instanceof z.ZodArray)
      defaults[key as keyof typeof shape] = [];
    else if (field instanceof z.ZodNullable)
      defaults[key as keyof typeof shape] = null;
    else defaults[key as keyof typeof shape] = null;
  });

  return defaults as z.infer<T>;
}
