import Joi from "joi";

const Session = {
  schema: Joi.object({
    type: Joi.string().valid("CHAT", "EMAIL").optional(),
    colleagueId: Joi.string().uuid().optional(),
  }),
};

export default Session;
