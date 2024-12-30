import { z } from 'zod';
import * as fs from 'fs';
import tinkerforgeSensorSchema from './schema/TinkerforgeSensor.schema';

const tinkerforgeSensorData = JSON.parse(
    fs.readFileSync('./data/tinkerforgeSensorData.json', 'utf8')
  );
  
  try {
    const validatedTinkerforgeData = tinkerforgeSensorSchema.parse(tinkerforgeSensorData);
  
    // If the data is valid, It can be used here
    console.log('Validated TinkerforgeSensor Data:', validatedTinkerforgeData);
  
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation Error:', error.errors);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }