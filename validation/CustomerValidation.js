import Joi from "joi";

export const CustomerValidation = Joi.object({
    name: Joi.string().required(),
    customertypeid: Joi.number().integer().required(),
});
export const customertypeValidation = Joi.object({
    typeName: Joi.string().required(),

});