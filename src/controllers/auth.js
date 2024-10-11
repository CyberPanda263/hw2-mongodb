import { createCookies } from "../constans/createCookies.js";
import { loginUser, logoutUser, refreshSession, registerUser, reqResetToken, resetPassword } from "../services/auth.js";

export const registerController = async (req, res) => {
    const { body } = req;
    const user = await registerUser(body);

    res.json({
        status: 201,
        message: 'Successfully registered a user!',
        data: {
            user: {
            name: user.name,
            email: user.email,
            id: user.id,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            }
        }
    });
};

export const loginController = async (req, res) => {
    const { body } = req;
    const session = await loginUser(body);

    createCookies(session, res);

    res.json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: {accessToken: session.accessToken}
    });
};

export const logoutController = async (req, res) => {
    await logoutUser(req.cookies.sessionId, req.cookies.sessionToken);
    res.clearCookie('sessionId');
    res.clearCookie('sessionToken');
    res.status(204).send();
};

export const refreshUserController = async (req, res) => {
    const session = await refreshSession(req.cookies.sessionId, req.cookies.sessionToken);

    createCookies(session, res);

    res.json({
        status: 200,
        message: 'Successfully is refreshed!',
        data: {accessToken: session.accessToken}
    });
};

export const reqResetTokenController = async (req, res) => {
    await reqResetToken(req.body.email);

    res.json({
        status: 200,
       message: "Reset password email has been successfully sent.",
       data: {}
    });
};

export const resetPasswordController = async (req, res) => {
    await resetPassword(req.body);

    res.json({
        status: 200,
        message: "Password has been successfully reset.",
        data: {}
    });
};
