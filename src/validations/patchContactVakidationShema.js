import Joi from "joi";

export const patchContactValidationShema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().min(3).max(20),
    email: Joi.string().min(3).max(20),
    isFavourite: Joi.bool().default(false),
    contactType: Joi.string().min(3).max(20).valid('work', 'home', 'personal').default('personal'),
})
