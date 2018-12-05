import * as crmController from "../controllers/crmController";
import { request } from "https";
//import result_pers1 from "./result_pers1";


const pers1 = {
    id: "595f0ceba07958ed50bea641", 
    email: "email_teste1@gmail.com", 
    username: "aaa1", 
    password: "passs",
    passwordConf: "passs", 
    firstName: "Aaaa", 
    lastName: "Bbbbb", 
    bornDate: "2015-03-12"
};

/*describe('User registration', () => {
    it('addNewContact', ()=>{
        return request(app).getHeader('/contact')
        .expect(200)
        .then((res)=>{
            expect(typeof res.body.message).toBe('json');
            expect(res.body.message).toBe(result_pers1);
        });
    });
});*/

describe('GetContacts test', () =>{
    it('should load user data', ()=>{
        return this.crmController.getContacts()
        .then(data => {
            expect(data).toBeDefined();
            expect(data.email).toEqual('aaaa14@zzz.com');
        });
    });
});