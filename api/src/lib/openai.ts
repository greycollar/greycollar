import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generate({
  model = "gpt-4o-mini-2024-07-18",
  messages = [],
  temperature = 0,
  max_tokens = 2048,
}) {
  const {
    choices: [
      {
        message: { content },
      },
    ],
    usage,
  } = await openai.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: { type: "json_object" },
  });

  if (usage) {
    const { prompt_tokens, completion_tokens } = usage;
    console.info({ prompt_tokens, completion_tokens });
  }

  if (content) {
    return JSON.parse(content);
  } else {
    throw new Error("OpenAI is not responding");
  }
}

export default { generate };
