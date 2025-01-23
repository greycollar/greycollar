import Session from "../models/Session";
import Colleague from "../models/Colleague";
import Conversation from "../models/Conversation";
import platform from "@nucleoidai/platform-express";
import { publish } from "../lib/Event";

async function create({
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
    const colleague = await Colleague.findByPk(session.colleagueId);

    if (!colleague) {
      throw platform.error.NotFoundError();
    }

    if (colleague.teamId !== teamId) {
      throw platform.error.AuthorizationError();
    }

    const newConversation = await Conversation.create({
      content,
      role: "USER",
      sessionId: id,
    });

    return newConversation;
  } else {
    const colleague = await Colleague.findByPk(colleagueId);

    if (!colleague) {
      throw platform.error.NotFoundError();
    }

    if (colleague.teamId !== teamId) {
      throw platform.error.AuthorizationError();
    }

    const newSession = await Session.create({ id, type, colleagueId });
    publish("SESSION.CREATED", {
      id,
      type,
      colleagueId,
      session: newSession,
    });
    return newSession;
  }
}

export default {
  create,
};
