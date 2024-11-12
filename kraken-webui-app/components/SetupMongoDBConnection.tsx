// getting-started.js
const mongoose = require('mongoose');

SetupMongoDBConnection().catch(err => console.log(err));

async function StartSetup() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

type Props = {
  key: value;
}

export default function SetupMongoDBConnection(props : Props) {
  StartSetup()
  return (
    props.children
  )
}