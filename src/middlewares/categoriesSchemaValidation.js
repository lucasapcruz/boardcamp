import { categoriesSchema } from "../models/categoriesSchema.js";

export async function categoriesSchemaValidation(req, res, next) {
  const category = req.body;

  const { error } = categoriesSchema.validate(category, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  next();
}
