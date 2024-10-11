import Joi from "joi";

export const resetPasswordValidations = Joi.object({
    password: Joi.string().required(),
    token: Joi.string().required()
});
