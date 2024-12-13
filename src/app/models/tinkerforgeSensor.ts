import mongoose from "mongoose";

if (typeof window === 'undefined') {
    console.log('running on server');
} else {
    console.log('running on client');
}

let TinkerforgeSensor : ReturnType<typeof getModel>;

if (mongoose.models.TinkerforgeSensor) {
    TinkerforgeSensor = mongoose.model('TinkerforgeSensor');
} else {
    TinkerforgeSensor = getModel();
}

function getModel() {
    const Schema = new mongoose.Schema({
        _id: String,
        date_created: String,
        date_modified: String,
        enabled: Boolean,
        label: String,
        description: String,
        uid: Number,
        config: mongoose.Schema.Types.Mixed, // TODO: check for correct inputs.
        on_connect: mongoose.Schema.Types.Mixed // TODO: check for correct inputs.
    })
    return mongoose.model('TinkerforgeSensor', Schema, 'TinkerforgeSensor');
}

export default TinkerforgeSensor;