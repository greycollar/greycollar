import { generate } from "../lib/llm";
import session from "./session";
import colleague from "./colleague";
import knowledgeFunc from "./knowledge";
import supervising from "./supervising";
import dataset from "../dataset";

async function info({ colleagueId }) {
  const { name, title, character, role } = await colleague.get({ colleagueId });
  return [
    {
      role: "assistant",
      content: {
        colleague_info: {
          name,
          character,
          title,
          role,
          job: "GreyCollar AI Assistant",
        },
      },
    },
  ];
}

async function knowledge({ colleagueId }) {
  const knowledgeList = await knowledgeFunc.list({
    colleagueId,
  });

  return knowledgeList.map(({ type, question, answer, text, content }) => ({
    role: "assistant",
    content: {
      knowledge: {
        type,
        question,
        answer,
        text,
        content,
      },
    },
  }));
}

async function conversations({ sessionId }) {
  const conversations = await session.listConversations({ sessionId });

  return conversations.map(({ role, content }) => ({
    role: role.toLowerCase(),
    content,
  }));
}

async function chat({
  colleagueId,
  sessionId,
  conversationId,
  content,
}: {
  colleagueId: string;
  sessionId: string;
  conversationId: string;
  content: string;
}) {
  const context = [
    ...(
      await Promise.all([
        info({ colleagueId }),
        knowledge({ colleagueId }),
        conversations({ sessionId }),
      ])
    ).flat(),
  ];

  const { evaluation } = await generate({
    dataset: [...dataset.chat],
    context,
    content,
    json_format: "{ evaluation: { is_answer_known: <true|false> } }",
    // Experimental Fields
    // json_format: `
    //     {
    //       evaluation: {
    //         is_answer_known: <true|false>,
    //         complies_with_policy: <true|false>,
    //         confidence_score: <0.0-1.0>,
    //         requires_human_intervention: <true|false>,
    //         response_type: <factual|opinion|instructional>,
    //         additional_notes: <string>,
    //         question_analysis: {
    //           category: <general_knowledge|HR_policy|technical|other>,
    //           complexity_level: <low|medium|high>,
    //           contains_sensitive_information: <true|false>,
    //           contains_prohibited_content: <true|false>
    //         },
    //         security: {
    //           is_safe_to_answer: <true|false>,
    //           data_privacy_risk: <low|medium|high>,
    //           potential_phishing_attempt: <true|false>
    //         },
    //         sentiment_analysis: {
    //           question_sentiment: <positive|neutral|negative>,
    //           toxicity_level: <none|low|medium|high>,
    //           user_frustration_detected: <true|false>
    //         },
    //         context: {
    //           previous_questions_context: <true|false>,
    //           user_role: <employee|manager|customer|other>,
    //           department: <engineering|HR|sales|other>,
    //           geolocation_restricted: <true|false>,
    //           requires_escalation: <true|false>
    //         },
    //         response_metadata: {
    //           source: <internal_knowledge_base|external_API|predefined_response>,
    //           response_format: <text|JSON|multimedia>,
    //           alternative_sources_available: <true|false>,
    //           fallback_strategy: <redirect_to_human|use_predefined_answer|other>
    //         }
    //       }
    //     }`,
  });

  console.debug(evaluation);

  if (evaluation.is_answer_known) {
    const { answer, confidence } = await generate({
      dataset: [...dataset.policy, ...dataset.chat],
      context,
      content,
      json_format: "{ answer: <ANSWER>, confidence: <0-1> }",
    });

    console.debug(answer, confidence);

    await session.addConversation({
      sessionId,
      colleagueId,
      role: "ASSISTANT",
      content: answer,
    });
  } else {
    await session.addConversation({
      sessionId,
      colleagueId,
      role: "ASSISTANT",
      content: "Please wait while I am working on your request.",
    });

    await supervising.create({
      sessionId,
      conversationId,
      question: content,
      colleagueId,
    });
  }
}

async function task({}) {}

async function step({}) {}

export default { chat, task, step };
