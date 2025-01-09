/**
 * This schema defines the structure and validation rules for sensor host data
 * stored in the MongoDB database. It represents a host device that manages and
 * communicates with one or more sensors.
 */
const mongoose = require("mongoose");
// Define the main schema for a SensorHost
const sensorHostSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.UUID, required: true },
  hostname: { type: String, required: true },
  port: { type: Number, required: true },
  pad: { type: Number },
  sad: { type: Number },
  driver: { type: String, required: true },
  node_id: { type: mongoose.Schema.Types.UUID, required: true },
  reconnect_interval: {
    type: Number,
    min: 0, // Ensure reconnect_interval is non-negative
  },
  revision_id: { type: mongoose.Schema.Types.UUID },
  date_created: { type: Date, required: true, default: Date.now },
  date_modified: { type: Date, required: true, default: Date.now },
  enabled: { type: Boolean, required: true },
  label: { type: String, required: true },
  description: { type: String },
});

const SensorHost = mongoose.model("SensorHost", sensorHostSchema);

export default SensorHost;
