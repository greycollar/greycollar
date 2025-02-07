import policy from "./policy.json";
import chat from "./train/chat.json";
import task from "./train/task.json";

export default {
  policy: policy.map((p) => ({
    role: "system" as "system" | "user" | "assistant",
    content: p,
  })),
  train: {
    chat: chat.map((c) => ({
      role: "system" as "system" | "user" | "assistant",
      content: {
        chat_train: c,
      },
    })),
    task: task.map((t) => ({
      role: "system" as "system" | "user" | "assistant",
      content: {
        task_train: t,
      },
    })),
  },
};
