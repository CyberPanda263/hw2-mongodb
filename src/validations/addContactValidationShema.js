import Joi from "joi";

export const addContactValidationShema = Joi.object({
    name: Joi.string().required().min(3).max(20),
    phoneNumber: Joi.string().required().min(3).max(20),
    email: Joi.string().required().min(3).max(20),
    isFavourite: Joi.bool().required().default(false),
    contactType: Joi.string().required().min(3).max(20).valid('work', 'home', 'personal').default('personal'),
})
