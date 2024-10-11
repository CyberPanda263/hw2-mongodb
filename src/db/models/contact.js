import {model, Schema } from "mongoose";

const contactSchema = new Schema(
    {
        userId: {
            type: String,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        photo: {
            type: String,
        },
        phoneNumber: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        isFavourite: {
            type: Boolean,
            default: false
        },
        contactType: {
            type: String,
            require: true,
            enum: ['work', 'home', 'personal'],
            default: 'personal'
        }
    }, {
        timestamps: true
    }
);

export const contactsModel = model('Contacts', contactSchema);
