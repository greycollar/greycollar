const displayCommand = async (app, data) => {
  const { createdAt, from, learnType, colleagueName, teamId, learningInfo } =
    data;

  const successMessage = `Learning Submission Successful! Colleague: ${colleagueName}, Type: ${learnType}, Information Provided: ${learningInfo}`;

  try {
    await app.client.chat.postMessage({
      channel: "C07QHJ38M7S",
      text: successMessage,
      attachments: [
        {
          color: "#36a64f",
          fallback: successMessage,
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `:white_check_mark: *Learning Submission Successful!*\n\n*Source${from}*\n\n:bust_in_silhouette: *Colleague:* ${colleagueName}\n:bookmark_tabs: *Type:* ${learnType}\n\n:information_source: *Information Provided:*\n${learningInfo}`,
              },
            },
          ],
        },
      ],
    });
  } catch (error) {
    console.error("Error displaying command:", error);
    throw error;
  }
};

export { displayCommand };

