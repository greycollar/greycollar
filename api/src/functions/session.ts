import Session from "../models/Session";
import Conversation from "../models/Conversation";
import { publish } from "../lib/Event";

async function addConversation({
  sessionId,
  type,
  colleagueId,
  content,
}: {
  sessionId: string;
  colleagueId: string;
  type: string;
  content: string;
}) {
  let session = await Session.findByPk(sessionId);

  if (!session) {
    session = await Session.create({ id: sessionId, type, colleagueId });
    publish("SESSION", "INITIATED", {
      id: sessionId,
      type,
      colleagueId,
    });
  }

  const conversation = await Conversation.create({
    content,
    role: "USER",
    sessionId,
  });

  publish("SESSION", "USER_MESSAGED", {
    id: conversation.id,
    content,
    session,
  });

  return conversation;
}

async function listConversations({ sessionId }: { sessionId: string }) {
  const conversations = await Conversation.findAll({
    where: { sessionId },
    order: [["createdAt", "ASC"]],
  });

  return conversations;
}

export default {
  addConversation,
  listConversations,
};
