import { generate } from "../lib/llm";
import session from "./session";
import colleague from "./colleague";
import knowledgeFunc from "./knowledge";
import supervising from "./supervising";
import dataset from "../dataset";
import taskFunc from "./task";
import actions from "../actions";

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
    dataset: [...dataset.train.chat],
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
      dataset: [...dataset.policy, ...dataset.train.chat],
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

async function task({ taskId }: { taskId: string }) {
  const { colleagueId, description } = await taskFunc.get({ taskId });
  const currentTask = {
    description,
    steps: await taskFunc.listSteps({ taskId }),
  };

  if (currentTask.steps.length > 10) {
    return await taskFunc.update({
      taskId,
      status: "FAILED",
      comment: "Failed due to too many steps",
    });
  }

  const context = [
    ...(
      await Promise.all([info({ colleagueId }), knowledge({ colleagueId })])
    ).flat(),
    actions.list(),
  ];

  const {
    next_step: { action, parameters, comment },
  } = await generate({
    dataset: [...dataset.train.task],
    context,
    content: currentTask,
    json_format:
      "{ next_step: { action: <ACTION>, parameters: <PARAMETER>, comment: <COMMENT> } }",
  });

  if (action === "COMPLETE") {
    return await taskFunc.update({ taskId, comment, status: "COMPLETED" });
  }

  await taskFunc.addStep({
    taskId,
    action,
    parameters,
    comment,
  });
}

async function step({ stepId, action, parameters }) {
  try {
    const { lib } = actions.find(action);
    const actionFunc = require(`../actions/${lib}`).default;

    const { taskId } = await taskFunc.getStep({ stepId });
    const steps = await taskFunc.listSteps({ taskId });

    const result = await actionFunc.run({
      context: steps
        .filter((step) => step.result)
        .map(({ comment, result }) => `Comment: ${comment}\nResult: ${result}`)
        .join("\n"),
      parameters,
    });

    await taskFunc.updateStep({ stepId, result, status: "COMPLETED" });
  } catch (err: Error) {
    await taskFunc.updateStep({
      stepId,
      result: err.message,
      status: "FAILED",
    });
  }
}

export default { chat, task, step };
