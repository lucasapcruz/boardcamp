import { rentSchema } from "../models/rentSchema.js";

export async function rentSchemaValidation(req, res, next) {
  const rent = req.body;

  const { error } = rentSchema.validate(rent, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  next();
}
