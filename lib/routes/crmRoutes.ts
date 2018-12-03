import { ContactController } from "../controllers/crmController";
import {Request, Response} from "express";

export class Routes {       
    
    public contactController: ContactController = new ContactController();
    
    
    public routes(app): void {          
        app.route('/')
            .get((req: Request, res: Response) => {            
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
        })

        // Create a new contact
        app.route('/contact')
            .post(this.contactController.addNewContact);
        // Get all contacts
        app.route('/contact')
            .get(this.contactController.getContacts);  
        // Get Contact with ID
        app.route('/contact/:contactId')
            .get(this.contactController.getContactWithID);
        // Updata contact with ID
        app.route('/contact/:contactId')
            .put(this.contactController.updateContact)
        // Delete contact with ID
        app.route('/contact/:contactId')
            .delete(this.contactController.deleteContact)
        

    }
}







