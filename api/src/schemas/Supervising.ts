import Joi from "joi";

const Supervising = {
  create: Joi.object({
    sessionId: Joi.string()
      .guid({ version: ["uuidv4"] })
      .required(),
    conversationId: Joi.string()
      .guid({ version: ["uuidv4"] })
      .required(),
    colleagueId: Joi.string()
      .guid({ version: ["uuidv4"] })
      .required(),
  }),
  patch: Joi.object({
    answer: Joi.string().optional(),
    status: Joi.string().valid("ANSWERED").optional(),
  }),
};

export default Supervising;
