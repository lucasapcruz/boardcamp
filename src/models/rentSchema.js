import baseJoi from "joi";
import dateExtension from "@joi/date";
const joi = baseJoi.extend(dateExtension);

export const rentSchema = joi.object({
    customerId: joi.number().integer().required().min(1),
    gameId: joi.number().integer().required().min(1),
    daysRented: joi.number().integer().required().min(0)
})