import Joi from "joi";

const TeamDetails = {
  update: Joi.object({
    coach: Joi.string().optional(),
    coachAvatar: Joi.string().optional(),
  }),
  default: Joi.object({
    id: Joi.string()
      .guid({ version: ["uuidv4"] })
      .required(),
    coach: Joi.string().required(),
    coachAvatar: Joi.string().required(),
  }),
};

export default TeamDetails;
