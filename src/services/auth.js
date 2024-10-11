import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import { User } from "../db/models/User.js";
import { Session } from "../db/models/Session.js";
import { createSession } from "../constans/createSession.js";
import { env } from "../utils/env.js";
import { sendMail } from "../utils/sendMail.js";
import { SMTP, TEMPLATES_DIR } from "../constans/index.js";

const findUserByEmail = async (email) => {
   return await User.findOne({email});
};

export const registerUser = async (payload) => {
    let user = await findUserByEmail(payload.email);

    if(user) {
        throw createHttpError(409, 'Email in use');
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    user = await User.create({...payload, password: hashedPassword});

    return user;
};


export const loginUser = async (payload) => {
    const user = await findUserByEmail(payload.email);

    if(!user) {
        throw createHttpError(401, 'The user does not exist');
    }

    const arrPasswordsEaqual = await bcrypt.compare(payload.password, user.password);

    if(!arrPasswordsEaqual){
        throw createHttpError(401, 'Invalid password');
    }

    await Session.deleteOne({userId: user._id});

    const session = await Session.create({
        userId: user.id,
        ...createSession()
    });

    return session;
};

export const logoutUser = async (sessionId, sessionToken) => {
    await Session.deleteOne({_id: sessionId, refreshToken: sessionToken});
};

export const refreshSession = async (sessionId, sessionToken) => {
   const session = await Session.findOne({_id: sessionId, refreshToken: sessionToken});
   if(!session) {
    throw createHttpError(401, 'Session not registry');
   }

   const now = new Date();

   if(session.refreshTokenValidUntil < now) {
    throw createHttpError(401, 'Refresh token expired' );
   }

   await Session.deleteOne({ _id: sessionId, refreshToken: sessionToken });

   const newSession = await Session.create({
    userId: session.userId,
    ...createSession()
});
 return newSession;
};

export const reqResetToken = async (email) => {
    const user = await User.findOne({email});

    if(!user) {
        throw createHttpError(404, 'User not found');
    }

    const resetToken = jwt.sign(
        {
            sub: user._id,
            email
        },
        env('JWT_SECRET'),
        {
            expiresIn: '15m'
        }
    );

    const resetPassTemplatePath = path.join(TEMPLATES_DIR, 'reset-password-email.html');

    const templatesSource = (
        await fs.readFile(resetPassTemplatePath)
    ).toString();

    const template = handlebars.compile(templatesSource);

    const html = template({
        name: user.name,
        link: `${env('APP_DOMAIN')}? token=${resetToken}`
    });

    try {
        await sendMail({
            from: env(SMTP.SMTP_FROM),
            to: email,
            subject: 'Reset your password',
            html
        });
    } catch {
        throw createHttpError(500, 'Failed to send the email, please try again later.');
    }
};

export const resetPassword = async (payload) => {
    let entries;

    try {
        entries = jwt.verify(payload.token, env('JWT_SECRET'));
    } catch {
        if(!entries) {
            throw createHttpError(401, "Token is expired or invalid.");
        }
    }

    const user = await User.findOne({
        email: entries.email,
        _id: entries.sub
    });

    if(!user) {
        throw createHttpError(404, "User not found!");
    }

    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    await User.updateOne(
        {_id: user.id},
        {password: encryptedPassword}
    );
};
