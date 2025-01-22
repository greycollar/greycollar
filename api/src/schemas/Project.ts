import Joi from "joi";

const Project = Joi.object({
  name: Joi.string().required(),
  icon: Joi.string().required(),
  description: Joi.string().required(),
  organizationId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
});

export default Project;
