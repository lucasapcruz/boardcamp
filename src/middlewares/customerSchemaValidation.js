import { customerSchema } from "../models/customerSchema.js";

export async function customerSchemaValidation(req, res, next) {
  const customer = req.body;

  const { error } = customerSchema.validate(customer, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  next();
}
