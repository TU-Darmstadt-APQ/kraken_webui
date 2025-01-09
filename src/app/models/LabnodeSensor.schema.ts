/**
 * This schema defines the structure and validation rules for Labnode sensors stored in the Mongo DB
 * stored in the MongoDB database.
 */
const mongoose = require("mongoose");

// Define a schema for the configuration of a Labnode sensor
const configSchema = new mongoose.Schema({
  interval: {
    type: Number,
    required: true,
    min: 0, // Ensure interval is non-negative
  },
  description: { type: String, required: true },
  topic: { type: String, required: true },
  unit: { type: String, required: true },
  timeout: { type: Number },
});
// Define the main schema for a Labnode sensor
const labnodeSensorSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.UUID, required: true },
  date_created: { type: Date, required: true, default: Date.now },
  date_modified: { type: Date, required: true, default: Date.now },
  enabled: { type: Boolean, required: true },
  label: { type: String },
  description: { type: String },
  uid: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
    min: 0, // Ensures it's non-negative (unsigned)
    max: 4294967295, // (uint32_t)
  },
  config: { type: Map, of: configSchema, required: true },
  on_connect: { type: Array, required: true },
});

const LabnodeSensor = mongoose.model("LabnodeSensor", labnodeSensorSchema);

export default LabnodeSensor;
