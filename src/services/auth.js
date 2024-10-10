import { User } from "../db/models/User.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { Session } from "../db/models/Session.js";
import { createSession } from "../constans/createSession.js";


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
