// getting-started.js
const mongoose = require('mongoose');

function StartSetup() {
  console.log("START CONNECTION")
  mongoose.connect('mongodb://admin:pass@127.0.0.1:8090/sensor_config').catch((error : any) => console.log("Catch Error:", error));;
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


export default function SetupMongoDBConnection() {
  StartSetup()
  WriteTest()
  return (
    <span></span>
  )
}
   