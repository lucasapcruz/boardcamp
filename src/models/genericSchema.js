import baseJoi from "joi";
import dateExtension from "@joi/date";
const joi = baseJoi.extend(dateExtension);

export const schema = joi.object({
});
