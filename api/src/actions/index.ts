import actions from "./actions.json";

function find(action: string) {
  return actions.find((a) => a.action === action);
}

function list() {
  return {
    role: "system",
    content: { actions },
  };
}

export default {
  find,
  list,
};
