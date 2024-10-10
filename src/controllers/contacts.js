import createError from "http-errors";
import { addContact, deleteContactById, getAllContacts, getContactByID, patchContactById } from "../services/contacts.js";
import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";
import { paginationValidateParams } from "../validations/paginationValidateParams.js";
import { parsingSortParams } from "../validations/parsingSortParams.js";

export const getContactsAllController = async (req, res) => {
    const {page, perPage} = paginationValidateParams(req.query);
    const {sortBy, sortOrder} = parsingSortParams(req.query);
    const userId = req.user._id;
    const contacts = await getAllContacts({page, perPage, sortBy, sortOrder}, userId);
        res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts
    });
};

export const getContact = async (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id;
    const contact = await getContactByID(contactId, userId);

    if (!contact) return next(createError(404, `Contact not found`));

    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id {${contactId}}!`,
        data: contact
    });
};

export const addContactController = async (req, res) => {
    const contact = req.body;
    const userId = req.user._id;

    const neewContact = await addContact(contact, userId);

    res.status(201).json({
        status: 201,
		message: "Successfully created a contact!",
		data: neewContact
    });
};

export const patchContactByIdController = async (req, res) => {
    const contactID = req.params.contactId;
    const body = req.body;
    const userId = req.user._id;
    const patchedContact = await patchContactById(contactID, body, userId);

    res.status(200).json({
        status: 200,
	    message: "Successfully patched a contact!",
	    data: patchedContact,
    });
};

export const deleteContactByIdController = async (req, res, next) => {
    const contactId = req.params.contactId;
    const userId = req.user._id;
    await deleteContactById(contactId, userId);
    res.status(204).send();
};
