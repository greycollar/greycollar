import policy from "./policy.json";
import chat from "./chat.json";
import task from "./task.json";

export default {
  policy: policy.map((p) => ({
    role: "system" as "system" | "user" | "assistant",
    content: p,
  })),
  chat: chat.map((c) => ({
    role: "system" as "system" | "user" | "assistant",
    content: c,
  })),
  task: task.map((t) => ({
    role: "system" as "system" | "user" | "assistant",
    content: t,
  })),
};
