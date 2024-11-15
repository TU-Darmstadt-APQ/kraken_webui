// getting-started.js
const mongoose = require('mongoose');

async function StartSetup() {
  await mongoose.connect('mongodb://admin:pass@127.0.0.1:8090/sensor_config');

}

const SensorSchema = new mongoose.Schema({
  name: String
});

const Sensor = mongoose.model('TestSensor', SensorSchema);

// Adding a test sensor
const TestSensor = new Sensor({ name: 'Test1' });
console.log(TestSensor.name); // 'Silence'

/**
type Props = {
  key: value;
}
*/
export default function SetupMongoDBConnection() {
 // StartSetup()
  return (
    <span>{TestSensor}</span>>
  )
}
   