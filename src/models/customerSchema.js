import baseJoi from "joi";
import dateExtension from "@joi/date";
const joi = baseJoi.extend(dateExtension);

export const customerSchema = joi.object({
    name: joi.string().required().min(1),
    phone: joi.string().pattern(/^[0-9]+$/).required().min(10).max(11),
    cpf: joi.string().pattern(/^[0-9]+$/).required().min(11).max(11),
    birthday: joi.date().format("YYYY-MM-DD").required(),
});
