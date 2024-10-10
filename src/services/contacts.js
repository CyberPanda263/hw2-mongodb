import createHttpError from "http-errors";
import { contactsModel } from "../db/models/contact.js";
import { createPaginationData } from "../utils/createPaginationData.js";

export const getAllContacts = async ({ page = 1, perPage = 4, sortBy = 'asc', sortOrder = 'name' }, userId) => {
    const skip = (page -1) * perPage;
    const [count, contacts] = await Promise.all([
        contactsModel.countDocuments({userId: userId}),
        contactsModel.find({userId: userId}).skip(skip).limit(perPage).sort({
            [sortBy]: sortOrder
        }),
    ]);

    return {
        data: contacts,
        page: page,
        perPage: perPage,
        totalItems: count,
        ...createPaginationData(count, page, perPage)
    };
};

export const getContactByID = async (contactID, userId) => {
    const contact = await contactsModel.find({userId: userId, _id: contactID});
    return contact;
};

export const addContact = async (contact, userId) => {
    const newContact = await contactsModel.create({...contact, userId});
    return newContact;
};

export const patchContactById = async (contactID, pachedData, userId) => {
    const pachedContact = await contactsModel.findOneAndUpdate({userId: userId, _id: contactID}, pachedData, {
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

export const deleteContactById = async (contactID, userId) => {
    const deletcontact = await contactsModel.findOneAndDelete({userId: userId, _id: contactID});

    if(!deletcontact) {
        throw createHttpError(404, {
            status: 404,
            message: "Contact not found"
        });
    }
};
