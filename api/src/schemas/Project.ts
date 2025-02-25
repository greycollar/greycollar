const Joi = require("joi");

const Project = Joi.object({
  name: Joi.string().required(),
  icon: Joi.string().required(),
  description: Joi.string().optional(),
  type: Joi.string().optional(),
  organizationId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .optional(),
  coach: Joi.string().optional(),
});

export default Project;
