import Joi from "joi";

const Session = {
  schema: Joi.object({
    type: Joi.string().valid("CHAT", "EMAIL").optional(),
    colleagueId: Joi.string().uuid().optional(),
    content: Joi.string().max(1000).optional(),
  }),
};

export default Session;
