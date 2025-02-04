import Supervising from "../models/Supervising";
import { publish } from "../lib/Event";

async function create({
  sessionId,
  conversationId,
  question,
  colleagueId,
}: {
  sessionId: string;
  conversationId: string;
  question: string;
  colleagueId: string;
}) {
  const supervising = await Supervising.create({
    sessionId,
    conversationId,
    question,
    colleagueId,
  });

  publish("SUPERVISING", "RAISED", {
    sessionId,
    conversationId,
    question,
    colleagueId,
  });

  return supervising;
}

export default { create };
