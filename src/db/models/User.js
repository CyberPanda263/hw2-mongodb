import {model, Schema, mongoose } from "mongoose";

const usersSchema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            unique: true,
            require: true,
        },
        password: {
            type: String,
            require: true
        },
    }, {
        timestamps: true
    }
);

//export const User = model('users', usersSchema);
export  const User = mongoose.models.User || mongoose.model('User', usersSchema);
