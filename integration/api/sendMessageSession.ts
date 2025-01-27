import http from "../http";
import storage  from "../Storage";

const sendMessageToSession = async (session, accessToken, question) => {
  const colleagueId = storage.get("selectedColleagueId");

  const message = await http.post(
    `/sessions/${session}`,
    {
      type: "CHAT",
      content: question,
      colleagueId: colleagueId,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  console.log("Message sent to session", message.data);
  return message.data;
};

export {
  sendMessageToSession,
};

