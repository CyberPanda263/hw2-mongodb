import {model, Schema } from "mongoose";

const contactSchema = new Schema(
    {
        name: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        email: {
            type: String
        },
        isFavourite: {
            type: Boolean,
            default: false
        },
        contactType: {
            type: String,
            enum: ['work', 'home', 'personal'],
            default: 'personal'
        }
    }, {
        timestamps: true
    }
);

export const contactsModel = model('Contacts', contactSchema);