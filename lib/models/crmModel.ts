import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    username:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    password:{
        type: String,
        required: true
    },

    passwordConf: {
        type: String,
        required: true
    },

    firstName:{
        type: String,
        trim: true
    },
    
    lastName:{
        type: String,
        trim: true
    },    
    
    created_date: {
        type: Date,
        default: Date.now
    }
});

//var User = mongoose.model('User', ContactSchema);
//module.exports=User;