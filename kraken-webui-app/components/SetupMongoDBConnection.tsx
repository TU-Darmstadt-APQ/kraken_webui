// getting-started.js
const mongoose = require('mongoose');

async function StartSetup() {
  await mongoose.connect('mongodb://admin:pass@127.0.0.1:8090/sensor_config');

}

const SensorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Sensor = mongoose.models.TestSensor || mongoose.model('TestSensor', SensorSchema);

// Adding a test sensor
const testSensor = new Sensor({ name: 'Test1' });
console.log(testSensor.name); // 'Silence'
console.log(testSensor)
// await testSensor.save();
const sensors = await Sensor.find();
console.log(sensors);
const plainSensor = testSensor.toObject();

/**
type Props = {
  key: value;
}
*/
export default function SetupMongoDBConnection() {
  StartSetup()
  return (
    <span>{JSON.stringify(plainSensor)}</span>
  )
}
   