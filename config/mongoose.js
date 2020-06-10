// require the library
const mongoose = require('mongoose');

// coonect to the database
mongoose.connect('mongodb://localhost/todo_list_db', { useUnifiedTopology: true , useNewUrlParser: true });

// acquire the connection (to check if it is successful)
const db = mongoose.connection;

// error
db.on('error',console.error.bind(console, 'error connecting to db'));

// up and running then print message
db.once('open', function(){
    console.log("Successfully Connected to database");
});