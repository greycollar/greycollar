import Joi from "joi";

const Command = {
  create: Joi.object({
    type: Joi.string().valid("KNOWLEDGE", "TASK", "SUPERVISING").required(),
    name: Joi.string().required(),
    referenceId: Joi.string()
      .guid({ version: ["uuidv4"] })
      .required(),
    teamId: Joi.string().guid({ version: ["uuidv4"] }),
  }),
};

export default Command;
