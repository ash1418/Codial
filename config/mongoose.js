const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codial_dev',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
 
 });

const db= mongoose.connection;
db.on('error',console.error.bind(console,"error connections to mongodb"));

db.once('open', function(){
    console.log('connected to database:: mongodb');
})

module.exports = db;