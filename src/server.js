import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constans/index.js';
import { notFoundRoute, errorhandler } from './middlewares/index.js';
import { getAllContacts, getContactByID } from './services/contacts.js';

const PORT = env(ENV_VARS.PORT, 3000);


export const setupServer = () => {


    const app = express();

    //middlewares
    app.use(pino(
        {
            transport: {
                target: 'pino-pretty',
            }
        }
    ));

    app.use(cors());

    app.use(express.json());

    app.get('/contacts', async (req, res) => {
        const contacts = await getAllContacts();
            res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts
        });
    });

    app.get('/contacts/:contactId', async (req, res) => {
        const { contactId } = req.params;

        if(contactId.length != 24) {
            return res.status(403).json({
                status: 403,
                message: 'The length of the ID must be 24 characters'
            });
        }

        const contact = await getContactByID(contactId);

        if (!contact) {
            return res.status(404).json({
                message: `Contact not found`,
            });
        }

        res.status(200).json({
            status: 200,
	        message: `Successfully found contact with id {${contactId}}!`,
	        data: contact
        });
    });
    
    //middleware not found
    app.use(notFoundRoute);
    // error handler
    app.use(errorhandler);
    
    app.listen(3000, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};