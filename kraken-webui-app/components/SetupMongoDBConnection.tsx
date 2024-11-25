// getting-started.js
const mongoose = require('mongoose');
const credentials = process.env.KRAKEN_CONFIGS_MONGODB_CREDENTIALS;
const host = process.env.KRAKEN_CONFIGS_MONGODB_HOST;
const port = process.env.KRAKEN_CONFIGS_MONGODB_PORT;

function StartSetup() {
  console.log("START CONNECTION")
  mongoose.connect(`mongodb://${credentials}@${host}:${port}/sensor_config`).catch((error : any) => console.log("Catch Error:", error));
  mongoose.connection.on('error', (err : any) => console.log("Catch Connection Error:", err))
  console.log("CONNECTION SETUP DONE")
}

function WriteTest() {
  const SensorSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    }
  });
  
  const Sensor = mongoose.models.TestSensor || mongoose.model('TestSensor', SensorSchema);
  
  // Adding a test sensor
  const testSensor = new Sensor({ name: 'Test1' });
  // await testSensor.save();
  const sensors = Sensor.find();
  console.log(sensors);
  // const plainSensor = testSensor.toObject();
}

async function run() {
  try {
    console.log("Starting Connection Test...")
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    console.log("Connection Test trough.")
  } finally {
    // Ensures that the client will close when you finish/error
    console.log("Disconnecting from MongoDB!")
    await mongoose.disconnect();
    console.log("Disconnected");
  }
}


export default function SetupMongoDBConnection() {
  StartSetup()
  // WriteTest()
  run().catch(console.dir);
  return (
    <span></span>
  )
}
   