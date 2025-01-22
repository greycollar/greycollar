import Joi from "joi";

const Colleague = Joi.object({
  name: Joi.string().required(),
  avatar: Joi.string().required(),
  role: Joi.string().required(),
  title: Joi.string().required(),
  character: Joi.string().required(),
  teamId: Joi.string().guid().required(),
  aiEngineId: Joi.string().guid().required(),
});

export default Colleague;
