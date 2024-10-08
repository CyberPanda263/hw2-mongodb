import createHttpError from "http-errors";
import { contactsModel } from "../db/models/contact.js";

export const getAllContacts = async () => {
    const contacts = await contactsModel.find();
    return contacts;
};

export const getContactByID = async (contactID) => {
    const contact = await contactsModel.findById(contactID);
    return contact;
};

export const addContact = async (contact) => {
    const newContact = await contactsModel.create(contact);
    return newContact;
};

export const patchContactById = async (contactID, pachedData) => {
    const pachedContact = await contactsModel.findByIdAndUpdate(contactID, pachedData, {
        new: true,
    });

    if(!pachedContact) {
        throw createHttpError(404, {
            status: 404,
            message: "Contact not found"
        });
    }

    return pachedContact;
};

export const deleteContactById = async (contactID) => {
    const deletcontact = await contactsModel.findByIdAndDelete(contactID);

    if(!deletcontact) {
        throw createHttpError(404, {
            status: 404,
            message: "Contact not found"
        });
    }
};
