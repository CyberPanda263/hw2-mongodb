import createError from "http-errors";
import { addContact, deleteContactById, getAllContacts, getContactByID, patchContactById } from "../services/contacts.js";

export const getContactsAllController = async (req, res) => {
    const contacts = await getAllContacts();
        res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts
    });
};

export const getContact = async (req, res, next) => {
    const { contactId } = req.params;
    
    const contact = await getContactByID(contactId);

    if (!contact) return next(createError(404, `Contact not found`));

    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id {${contactId}}!`,
        data: contact
    });
};

export const addContactController = async (req, res) => {
    const contact = req.body;

    const neewContact = await addContact(contact);

    res.status(201).json({
        status: 201,
		message: "Successfully created a contact!",
		data: neewContact
    });
};

export const patchContactByIdController = async (req, res) => {
    const contactID = req.params.contactId;
    const body = req.body;
    
    const patchedContact = await patchContactById(contactID, body);

    res.status(200).json({
        status: 200,
	    message: "Successfully patched a contact!",
	    data: patchedContact,
    });
};

export const deleteContactByIdController = async (req, res, next) => {
    const contactId = req.params.contactId;
    await deleteContactById(contactId);
    res.status(204).send();
};