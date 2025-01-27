import http from "../http";
import storage from "../Storage";

const createSession = async (session, accessToken) => {
  const colleagueId = storage.get("selectedColleagueId");

  const create = await http.post(
    `/sessions/${session}`,
    {
      type: "CHAT",
      colleagueId: colleagueId,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  console.log("Session created", create.data);
  return create.data;
};

export { createSession };
