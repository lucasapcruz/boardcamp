import baseJoi from "joi";
import dateExtension from "@joi/date";
const joi = baseJoi.extend(dateExtension);

export const categoriesSchema = joi.object({
    name: joi.string().required().min(1)
});
