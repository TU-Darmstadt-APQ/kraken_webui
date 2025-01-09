/**
 * This schema defines the structure and validation rules for generic sensors stored in the Mongo DB
 * stored in the MongoDB database.
 */
const mongoose = require("mongoose");

// Define the main schema for Generic sensor
const genericSensorSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.UUID, required: true },
  date_created: { type: Date, required: true, default: Date.now },
  date_modified: { type: Date, required: true, default: Date.now },
  enabled: { type: Boolean, required: true },
  label: { type: String },
  description: { type: String }, // Description is not required
  host: {
    type: mongoose.Schema.Types.UUID,
    ref: "SensorHost",
    required: true,
  },
  driver: { type: String, required: true },
  interval: {
    type: Number,
    required: true,
    min: 0, // Ensure interval is non-negative
  },
  on_connect: [
    {
      function: { type: String, required: true },
      args: { type: Array, required: true },
      kwargs: { type: Map, of: mongoose.Schema.Types.Mixed, required: true },
      timeout: { type: Number },
    },
  ],
  on_read: {
    function: { type: String, required: true },
    args: { type: Array, required: true },
    kwargs: { type: Map, of: mongoose.Schema.Types.Mixed, required: true },
    timeout: { type: Number },
  },
  on_after_read: { type: Array, required: true },
  on_disconnect: [
    {
      function: { type: String, required: true },
      args: { type: Array, required: true },
      kwargs: { type: Map, of: mongoose.Schema.Types.Mixed, required: true },
      timeout: { type: Number },
    },
  ],
  topic: { type: String, required: true },
  unit: { type: String, required: true },
});

const GenericSensor = mongoose.model("GenericSensor", genericSensorSchema);

export default GenericSensor;
