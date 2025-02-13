let llm;

if (process.env.LLM === "OPENAI") {
  llm = require("./openai").default;
}

if (process.env.LLM === "AZURE") {
  llm = require("./azure").default;
}

async function generate({
  model,
  dataset = [],
  context = [],
  content,
  json_format,
  temperature = 0,
  max_tokens,
}: {
  model?: string;
  dataset: {
    role: "system" | "user" | "assistant";
    content: object | object[];
  }[];
  context: {
    role: "system" | "user" | "assistant";
    content: object | object[];
  }[];
  content: string | object;
  json_format: string;
  temperature?: number;
  max_tokens?: number;
}) {
  const messages = [
    ...dataset,
    ...context,
    { role: "user", content: JSON.stringify(content) },
    {
      role: "system",
      content: `json_format: ${json_format}`,
    },
  ].map(({ role, content }) => ({
    role,
    content: JSON.stringify(content),
  }));

  return await llm.generate({
    model,
    messages,
    temperature,
    max_tokens,
  });
}

export { generate };
