import Conversation from "../models/Conversation";
import Session from "../models/Session";
import { publish } from "../lib/Event";

async function chat({
  id,
  teamId,
  type,
  colleagueId,
  content,
}: {
  id: string;
  teamId: string;
  type: string;
  colleagueId: string;
  content: string;
}) {
  const session = await Session.findByPk(id);

  if (session) {
    const newConversation = await Conversation.create({
      content,
      role: "USER",
      sessionId: id,
    });

    return newConversation;
  } else {
    const newSession = await Session.create({ id, type, colleagueId });

    const newConversation = await Conversation.create({
      content,
      role: "USER",
      sessionId: newSession.id,
    });

    publish("SESSION", "CREATED", {
      id: newSession.id,
      type,
      colleagueId,
      session: newSession,
    });
    publish("SESSION", "AI_MESSAGED", {
      session: {
        id: newSession.id,
      },
    });
  }
}

export default {
  chat,
};
