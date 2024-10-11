import {model, Schema } from "mongoose";

const usersSchema = new Schema(
    {
        userId: {
            type: String,
           // type: Schema.ObjectId,
            require: true

        },
        accessToken: {
            type: String,
            require: true
        },
        refreshToken: {
            type: String,
            require: true
        },
        accessTokenValidUntil: {
            type: Date,
            require: true
        },
        refreshTokenValidUntil: {
            type: Date,
            require: true
        }
    }, {
        timestamps: true
    }
);

export const Session = model('sesion', usersSchema);
