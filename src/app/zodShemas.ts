import { z } from 'zod';

export const textSchema = z.string()
    .min(2, 'The field must contain minimum 2 characters')
    .max(30, 'The field must not exceed 30 characters')
    .regex(/^[a-zA-Z0-9\s]+$/, 'The field can only contain letters and spaces');


export const numberSchema = z
  .number()
  .int('The field must be an integer')
  .positive('The field must be a positive number');

export const querySchema = z.string()
    .max(15, 'The field must not exceed 30 characters')
    .regex(/^[a-zA-Z0-9\s]*$/, 'The field can only contain letters and spaces');

/** Functions for flexibility */
export const validateText = (value: string) => textSchema.safeParse(value);
export const validateNumber = (value: number) => numberSchema.safeParse(value);
export const validateQuery = (value: string) => querySchema.safeParse(value);