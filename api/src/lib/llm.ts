import { v4 as uuid } from "uuid";

let llm;

if (process.env.LLM === "OPENAI") {
  llm = require("../../../../Nucleoid/arc/src/lib/openai");
}

if (process.env.LLM === "AZURE") {
  llm = require("./azure");
}

async function generate({ model, messages = [], temperature = 0, max_tokens }) {
  return llm.generate({
    model,
    messages,
    temperature,
    max_tokens,
  });
}

module.exports = { generate };
