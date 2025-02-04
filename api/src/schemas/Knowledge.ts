import Joi from "joi";

const Knowledge = {
  create: Joi.object({
    type: Joi.string().valid("QA", "URL", "TEXT").required(),
    colleagueId: Joi.string().guid({ version: ["uuidv4"] }),
    teamId: Joi.string().guid({ version: ["uuidv4"] }),
    question: Joi.string().optional(),
    answer: Joi.string().optional(),
    url: Joi.string().uri().optional(),
    text: Joi.string().optional(),
  }),
  update: Joi.object({})
    .when(Joi.object({ type: Joi.string().valid("QA") }).unknown(), {
      then: Joi.object({
        question: Joi.string(),
        answer: Joi.string(),
      }),
    })
    .when(Joi.object({ type: Joi.string().valid("URL") }).unknown(), {
      then: Joi.object({
        url: Joi.string().uri(),
        text: Joi.string(),
      }),
    })
    .when(Joi.object({ type: Joi.string().valid("TEXT") }).unknown(), {
      then: Joi.object({
        text: Joi.string(),
      }),
    }),
};

export default Knowledge;
