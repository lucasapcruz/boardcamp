import { schema } from "../models/genericSchema.js";

export async function schemaValidation(req, res, next) {
  const body = req.body;

  const { error } = schema.validate(body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  next();
}
