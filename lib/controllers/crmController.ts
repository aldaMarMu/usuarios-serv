import * as mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';
import * as express from 'express';

const Contact = mongoose.model('Contact', ContactSchema);

export class ContactController{

    public addNewContact (req, res, next) {                
        let newContact = new Contact(req.body);
        if(req.body.password !== req.body.passwordConf){
            var err = new Error('Pass not match');
            res.status(400).send(
                'Pass not match');
            return next(err);
        }
        if (req.body.email && req.body.username && req.body.password && req.body.passwordConf){
            var contactData={
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                passwordConf: req.body.passwordConf,
                firstname: req.body.firstname,
                lastname: req.body.lastname
            }
            
            Contact.create(contactData, function(error, contact ){
                if(error){
                    res.send(error);
                    return next(error);
                }
                    return res.json(contact);
                    /*req.session.userId=contact._id;
                    return res.redirect('/contact');*/
                
            });
   /*     } else if (req.body.logemail && req.body.logpassword) {
            Contact.authenticate(req.body.logemail, req.body.logpassword, function (error, contact) {
              if (error || !contact) {
                var err = new Error('Wrong email or password.');
                res.status(401).send(
                    'Wrong email or password.');
                return next(err);
              } else {
                req.session.userId = contact._id;
                return res.redirect('/profile');
              }
            });
        */  } else {
            var err = new Error('All fields required');
            res.status(400).send(
                'All fields required: email, username, pass, passconf, firstname, lastname.');
            return next(err);
        }
            
    }

    public getContacts (req, res, next) {           
        Contact.find({}, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

    public getContactWithID (req, res, next) {           
        Contact.findById(req.params.contactId, (err, contact) => {
            if(err){
                res.send(err);
                return next(err);
            }else{
                if(contact===null){
                    var error= new Error('Not authorized');
                    res.status(400).send(
                        'Not authorized');
                    return next(error);
                }else {
                    return res.json(contact);
                }
            }
            
        });
    }

    public updateContact (req, res, next) {           
        Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

    public deleteContact (req, res) {           
        Contact.remove({ _id: req.params.contactId }, (err, contact) => {
            if(err){
                res.status(400).send(
                    "Delete error"
                );
            }
            res.json({ message: 'Successfully deleted contact!'});
        });
    }
}
