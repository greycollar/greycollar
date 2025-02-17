import actions from "./actions.json";

function find(action: string) {
  return actions.find((a) => a.action === action);
}

function list() {
  return {
    role: "system",
    content: { actions },
  } as {
    role: "user" | "system" | "assistant";
    content: object;
  };
}

export default {
  find,
  list,
};
