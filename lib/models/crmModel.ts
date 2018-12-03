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
        trim: true,
        default: 'Aaa'
    },
    
    lastName:{
        type: String,
        trim: true,
        default: 'Aaa'
    },    
    
    created_date: {
        type: Date,
        default: Date.now
    }
});

export const LoginShcema = new Schema({
    logemail: {
        type: String,
        required: true,
        trim:true,
    },
    logpassword: {
        type: String,
        required: true,
        trim: true
    }
});

//var User = mongoose.model('User', ContactSchema);
//module.exports=User;