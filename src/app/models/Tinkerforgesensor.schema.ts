/**
*This schema defines the structure and validation rules for Tinkerforge sensor data  
*stored in the MongoDB database. 
*/
const mongoose = require('mongoose');  
  
// Define a schema for the configuration of a Tinkerforge sensor
const configSchema = new mongoose.Schema({  
  interval: { type: Number, required: true },  
  trigger_only_on_change: { type: Boolean, required: true },  
  description: { type: String, required: true },  
  topic: { type: String, required: true },  
  unit: { type: String, required: true },  
});  
  
// Define the main schema for a Tinkerforge sensor
const tinkerforgeSensorSchema = new mongoose.Schema({  
  _id: { type: mongoose.Schema.Types.UUID, required: true },  
  date_created: { type: Date, required: true },  
  date_modified: { type: Date, required: true },  
  enabled: { type: Boolean, required: true },  
  label: { type: String },
  description: { type: String, required: true },  
  uid: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
    min: 0, // Ensures it's non-negative (unsigned)
  }, 
  config: { type: Map, of: configSchema, required: true },  
  on_connect: [{  
    function: { type: String, required: true },  
    args: { type: Array, required: true },  
    kwargs: { type: Map, of: mongoose.Schema.Types.Mixed, required: true },  
    timeout: { type: Number },
  }],  
});  
  
// Create a Mongoose model for the Tinkerforge sensor
const TinkerforgeSensor = mongoose.model('TinkerforgeSensor', tinkerforgeSensorSchema);  
  
// Export the model to be used in other parts of the application
module.exports = TinkerforgeSensor;