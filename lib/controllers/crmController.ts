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

        if (req.body.email && req.body.username && req.body.password && req.body.passwordConf && req.body.firstName && req.body.lastName && req.body.bornDate) {
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
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        bornDate: req.body.bornDate
                    }
                    const hoy: Date = new Date();
                    const edad: Date= new Date(contactData.bornDate);
                    const minimo: Number= 441796600000;
                /*    console.log(edad);
                    console.log(hoy);
                    console.log((hoy.getTime() - edad.getTime()));
                    console.log(minimo);
                    console.log(contactData);
                */
                    if((hoy.getTime() - edad.getTime()) < minimo){
                        var error_date = new Error('You are too young! You shall not pass');
                        res.status(400).send(
                            'You are too young! You shall not pass');
                        return next(error_date);
                    }
                    
                    Contact.create(contactData, function (error, contact) {
                        if (error) {
                            res.send(error);
                            return next(error);
                        }
                        //req.session.userId = contact._id;
                        res.send(200);
                        return res.json(contact);
                        //return res.redirect('/contact');
                    });
                }
            });


        } else {
            var err = new Error('All fields required');
            res.status(400).send(
                'All fields required: email, username, pass, passconf, firstname, lastname and bornDate (mm-dd-aaaa).');
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
                    /*console.log("************Contact Finded*******************");
                    console.log(contactFinded);
                    console.log(contactFinded.password);*/
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
