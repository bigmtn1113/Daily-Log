const mongoose = require('mongoose')

const DAILYLOG_DB_ADDR = process.env.DAILYLOG_DB_ADDR; 
const mongoURI = "mongodb://" + DAILYLOG_DB_ADDR + "/dailylog"

const db = mongoose.connection;

db.on('disconnected', () => {
    console.error(`Disconnected: unable to reconnect to ${mongoURI}`)
    throw new Error(`Disconnected: unable to reconnect to ${mongoURI}`) 
})
db.on('error', (err) => {
    console.error(`Unable to connect to ${mongoURI}: ${err}`);
});

db.once('open', () => {
  console.log(`connected to ${mongoURI}`);
});

const connectToMongoDB = async () => {
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        connectTimeoutMS: 2000,
        reconnectTries: 1
    })
};

const messageSchema = mongoose.Schema({
    title: { type: String, required: [true, 'Title is required'] },
    content: { type: String, required: [true, 'Content is required'] },
    date: { type: String, required: [true, 'Date is required'] },
    timestamps: {}
});

const messageModel = mongoose.model('Message', messageSchema);

const construct = (params) => {
    const title = params.title
    const content = params.content
    const date = params.date
    const message = new messageModel({ title: title, content: content, date: date })
    return message
};

const save = (message) => {
    console.log("saving message...")
    message.save((err) => {
        if (err) { throw err }
    })
};

// Constructs and saves message
const create = (params) => {
    try {
        const msg = construct(params)
        const validationError = msg.validateSync()
        if (validationError) { throw validationError }
        save(msg)
    } catch (error) {
        throw error
    }
}

module.exports = {
    create: create,
    messageModel: messageModel,
    connectToMongoDB: connectToMongoDB
}

