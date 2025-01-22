import Joi from "joi";

const Message = {
  create: Joi.object({
    role: Joi.string().valid("SYSTEM", "USER", "ASSISTANT").required(),
    colleagueId: Joi.string()
      .guid({ version: ["uuidv4"] })
      .optional(),
    content: Joi.string().max(1000).optional(),
    userId: Joi.string().optional(),
    command: Joi.string().optional(),
    knowledgeId: Joi.string()
      .guid({ version: ["uuidv4"] })
      .optional(),
    replyTo: Joi.string()
      .guid({ version: ["uuidv4"] })
      .optional()
      .when("role", { is: "USER", then: Joi.optional() }),
  }),
  patch: Joi.object({
    status: Joi.string().valid("READ").required(),
  }),
};

export default Message;
