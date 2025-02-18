export const formatKey = (key) => {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const parseJsonResult = (result) => {
  if (!result) {
    return { isJson: false, parsedResult: "No result available" };
  }

  try {
    const parsedResult = Array.isArray(result)
      ? result
      : JSON.parse(String(result));
    return { isJson: true, parsedResult };
  } catch (e) {
    return { isJson: false, parsedResult: result };
  }
};

export const getAllKeys = (data) => {
  if (Array.isArray(data)) {
    return [...new Set(data.flatMap((obj) => Object.keys(obj)))];
  }
  if (typeof data === "object" && data !== null) {
    return Object.keys(data);
  }
  return [];
};
