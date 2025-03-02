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
    if (data.every((item) => typeof item === "object" && item !== null)) {
      return data.map((item) => {
        const keys = Object.keys(item);
        const values = Object.values(item);
        return { keys, values };
      });
    } else {
      return data.map((value, index) => {
        return { keys: [], values: [value], index: index + 1 };
      });
    }
  }
  if (typeof data === "object" && data !== null) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    return [{ keys, values }];
  }
  return [];
};
