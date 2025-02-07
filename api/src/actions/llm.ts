let llm;

if (process.env.LLM === "OPENAI") {
  llm = require("../lib/openai").default;
}

if (process.env.LLM === "AZURE") {
  llm = require("../lib/azure").default;
}

async function run({ context, parameters: { message } }) {
  const { result } = await llm.generate({
    messages: [
      {
        role: "assistant",
        content: JSON.stringify(context),
      },
      {
        role: "assistant",
        content: JSON.stringify(message),
      },
      {
        role: "system",
        content: "{ json_format: { result: <RESULT> } }",
      },
    ],
  });

  return result;
}

export default { run };
