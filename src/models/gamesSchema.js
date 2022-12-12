import baseJoi from "joi";
import dateExtension from "@joi/date";
const joi = baseJoi.extend(dateExtension);

export const gamesSchema = joi.object({
    name: joi.string().required().min(1),
    image: joi.string().uri().required(),
    stockTotal: joi.number().integer().required().min(0),
    categoryId: joi.number().integer().required(),
    pricePerDay: joi.number().integer().required().min(0),
});
