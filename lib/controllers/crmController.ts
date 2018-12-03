import * as mongoose from 'mongoose';
import { ContactSchema, LoginShcema } from '../models/crmModel';
import * as express from 'express';
import * as bcrypt from 'bcrypt';

const Contact = mongoose.model('Contact', ContactSchema);
const LoginData = mongoose.model('logContact', LoginShcema);

var contactData;
const saltRounds = 10;

export class ContactController {

    public addNewContact(req, res, next) {
        let newContact = new Contact(req.body);
        if (req.body.password !== req.body.passwordConf) {
            var err = new Error('Pass not match');
            res.status(400).send(
                'Pass not match');
            return next(err);
        }
        if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                if (err) {
                    res.status(400).send(
                        'Error HASH');
                    return next(err);
                } else {
                    contactData = {
                        email: req.body.email,
                        username: req.body.username,
                        password: hash,
                        passwordConf: hash,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname
                    }
                    Contact.create(contactData, function (error, contact) {
                        if (error) {
                            res.send(error);
                            return next(error);
                        }
                        //req.session.userId = contact._id;
                        return res.json(contact);

                        //return res.redirect('/contact');

                    });
                }
            });


        } else {
            var err = new Error('All fields required');
            res.status(400).send(
                'All fields required: email, username, pass, passconf, firstname, lastname.');
            return next(err);
        }

    }

    public getContacts(req, res, next) {
        Contact.find({}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public getContactWithID(req, res, next) {
        Contact.findById(req.params.contactId, (err, contact) => {
            if (err) {
                res.send(err);
                return next(err);
            } else {
                if (contact === null) {
                    var error = new Error('Not authorized');
                    res.status(400).send(
                        'Not authorized');
                    return next(error);
                } else {
                    return res.json(contact);
                }
            }

        });
    }

    public updateContact(req, res, next) {
        Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public deleteContact(req, res) {
        Contact.remove({ _id: req.params.contactId }, (err, contact) => {
            if (err) {
                res.status(400).send(
                    "Delete error"
                );
            }
            res.json({ message: 'Successfully deleted contact!' });
        });
    }

    public loginContact(req, res) {
        if (req.body.logemail && req.body.logpassword) {
            Contact.findOne({email: req.body.logemail}).exec(function(error, contactFinded){
                //console.log(contactFinded);
                if(error){
                    var err = new Error('FIND Wrong email or password.');
                    res.status(401).send(
                        'FIND Wrong email or password.');
                }else if(!contactFinded){
                    var err = new Error('User not found');
                    res.status(401).send(
                        'User not found');
                }
                console.log(req.body.logpassword);
                bcrypt.hash(req.body.logpassword, saltRounds).then(function(hash) {
                    //console.log(contactFinded.password);
                    //if(hash===contactFinded.password){}
                    bcrypt.compare(req.body.logpassword, contactFinded.password, function(error, result){
                        //console.log(req.body.logpassword);
                        if(error){
                            var error1 = new Error('Error con la password');
                            res.status(401).send(
                                'Error con la password');
                            }
                        if(result===true){
                        res.status(200).send('You are logged in!');
                        //req.session.userId = contactData._id;
                        //return res.redirect('/profile');
                        }else{
                        var err = new Error('Wrong password.');
                        res.status(401).send(
                            'Wrong password.');
                        }
                    });
                });
                
            }) 
        };
    }
}
