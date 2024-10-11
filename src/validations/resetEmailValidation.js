import Joi from "joi";

export const resetEmailValidation = Joi.object({
    email: Joi.string().email().required()
});
