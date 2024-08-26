const mongoose = require('mongoose');
const DB = process.env.DATABASE


mongoose.connect(DB).then(() => {
    console.log("connection successfull")
}).catch((error) => {
    console.log("no connection", error)
});
