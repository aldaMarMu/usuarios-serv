import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    email:{
        type: String,
        unique: true,
        required: 'Please enter your email',
        trim: true,
        lowercase: true
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
        required: true,
    },
    
    lastName:{
        type: String,
        trim: true,
        required: true
    },    

    bornDate: {
        type: Date,
        required: true,
    },
    
    created_date: {
        type: Date
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