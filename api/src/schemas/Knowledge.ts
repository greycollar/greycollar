import Joi from "joi";

const Knowledge = {
  create: Joi.object({
    type: Joi.string().valid("QA", "URL", "TEXT").required(),
  })
    .xor("colleagueId", "teamId")
    .or("colleagueId", "teamId")
    .concat(
      Joi.object({
        colleagueId: Joi.string().guid({ version: ["uuidv4"] }),
        teamId: Joi.string().guid({ version: ["uuidv4"] }),
      })
    )
    .when(Joi.object({ type: Joi.string().valid("QA") }).unknown(), {
      then: Joi.object({
        question: Joi.string().required(),
        answer: Joi.string().required(),
      }),
    })
    .when(Joi.object({ type: Joi.string().valid("URL") }).unknown(), {
      then: Joi.object({
        url: Joi.string().uri().required(),
      }),
    })
    .when(Joi.object({ type: Joi.string().valid("TEXT") }).unknown(), {
      then: Joi.object({
        text: Joi.string().required(),
      }),
    }),
  update: Joi.object({
    type: Joi.string().valid("QA", "URL", "TEXT").optional(),
  })
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
