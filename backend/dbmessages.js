import mongoose from "mongoose";
import {Schema} from "mongoose"

const messageSchema = new Schema({
    message: {
        type:   String,
        required: true
    },
    name : {
        type:String,
        default : "hello world"
    },
    timestamp : {
        type :String,
        default : Date.now
    },
    received : {
        type: Boolean,
        default : false
    },
})

// setting up a collection inside the database

export default mongoose.model('Message' , messageSchema)