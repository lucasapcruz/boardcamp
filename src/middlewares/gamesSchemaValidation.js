import { gamesSchema } from "../models/gamesSchema.js";

export async function gamesSchemaValidation(req, res, next) {
  const game = req.body;

  const { error } = gamesSchema.validate(game, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  next();
}
