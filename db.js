const mongoose = require('mongoose');

// define the MongoDB connection url...
const mongoURL = 'mongodb://localhost:27017/hotel'

// Set-up MongoDB Connection....
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

// Get the default connnection
// Mongoose maintain a default connection object representing the MongoDB connection....
const db = mongoose.connection;


// Define event listeners for database Connection....

db.on('connected',()=>{
    console.log('Connected to MongoDB Server......');
});

db.on('error',(err)=>{
console.log('MongoDB Connection Error.!.!.!.!.!',err);
});

db.on('Disconnected',()=>{
    console.log('MongoDB Server Disconnected.......');
});


// Export the database Connection 
module.exports = db;

