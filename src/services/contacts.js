import { contactsModel } from "../db/models/contact.js";

export const getAllContacts = async () => {
    const contacts = await contactsModel.find();
    return contacts;
};

export const getContactByID = async (contactID) => {
    const contact = await contactsModel.findById(contactID);
    return contact;
};