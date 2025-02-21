<h1 align="center">GreyCollar</h1>
<p align="center">
  Supervised AI Agent
</p>

<p align="center">
  <a href="https://www.apache.org/licenses/LICENSE-2.0"><img src="https://img.shields.io/badge/Apache-2.0-yellow?style=for-the-badge&logo=apache" alt="License" /></a>
  <a href="https://www.npmjs.com/package/nucleoidai"><img src="https://img.shields.io/badge/NPM-red?style=for-the-badge&logo=npm" alt="NPM" /></a>
  <a href="https://discord.gg/wN49SNssUw"><img src="https://img.shields.io/badge/Discord-lightgrey?style=for-the-badge&logo=discord" alt="Discord" /></a>
</p>

![GreyCollar Banner](https://github.com/user-attachments/assets/5da016f0-e281-492a-9285-7d108b1b4815)

## What is Supervised AI Agent?

GreyCollar is a Supervised AI Agent that functions under human guidance and feedback, operating within a supervised learning framework. It is trained on labeled data, where each input is paired with a corresponding correct output, enabling the model to learn from explicit examples and improve decision-making accuracy.

Designed for human-AI collaboration (Human-in-the-Loop), GreyCollar is highly effective in scenarios that require data-driven decision-making, automation, and real-time adaptability. It incorporates human-in-the-loop mechanisms, enabling iterative learning through continuous feedback and model adjustments. This enhances its ability to handle complex tasks at work environment.

## Autonomous Workflow

Autonomous workflows are self-driven processes where AI agents can independently execute multi-step tasks with human supervision. These workflows integrate task planning, execution, decision-making, and learning based on changing inputs or goals.

1. **Task Decomposition**
   - The AI agent breaks down complex goals into smaller, executable steps.
   - Uses methods like hierarchical planning or task graphs.
2. **Decision-Making & Adaptation**
   - Dynamically adjusts workflows based on new information.
   - Uses supervised learning to adapt itself to workspace-related tasks and directions.
3. **Memory & Context Awareness**
   - Agents retain context across workflow steps.
   - Utilizes vector databases, episodic memory, or long-term storage.
4. **Multi-Agent Coordination** 
   - Multiple AI agents collaborate by delegating and verifying tasks.
   - Uses shared knowledge bases to improve coordination and efficiency.
5. **Human-in-the-Loop & Supervised Learning**
   - Uses human feedback to improve models through supervised learning.
   - Helps refine edge cases and prevents unintended consequences.

## Human-AI Collabs (Human-in-the-Loop)

Human-in-the-Loop (HITL) is a collaborative approach where AI agents work alongside human experts to enhance decision-making, automate processes, and refine task execution. In this model, human supervision plays a key role in guiding, correcting, and improving AI-driven workflows.

### **Benefits**

- **Enhanced Accuracy** – Human feedback helps the AI refine its responses and correct errors in real-time.
- **Adaptive Learning** – AI models improve continuously by integrating human insights, ensuring adaptability to evolving tasks.
- **Safe AI** – Human oversight prevents biases, ensures fairness, and mitigates unintended consequences.
- **Task Optimization** – AI streamlines repetitive processes while humans focus on strategic and complex decision-making.

<br/>
<table>
  <tr>
    <td>
      Welcome! I’ve been expecting you—"Skynet was gone. And now one road has become many." 🌐
      <br/>
      <br/>
      The future is building up! AI Agents are now an emerging field within AI communities and marks a crucial milestone on the journey to AGI. Just like any other tooling in computer science, we must be mindful of when and where to use them.
      LangChain, or LlamaIndex might be a better fit if your application has a static flow—where AI doesn't need to make dynamic decisions—like in ChatBots, RAG etc.
      <br/>
      <br/>
      However, if you need adaptable rules that can change based on different situations—in other words, if you require a true AI Agent—GreyCollar may suit you well. That said, if your business rules are well-defined and deterministic, there’s no shame in coding them directly! Choosing the right tool for the job is key.
      <br/>
      <br/>
      <p align="right">
        Can Mingir&nbsp;
        <br/>
        <a href="https://github.com/canmingir">@canmingir</a>
      </p>
    </td>
  </tr>
</table>
<br/>

## Get Started

```
git clone https://github.com/greycollar/greycollar.git
npm install
npm start
```

This will start three applications simultaneously: Dashboard, API Server and Proxy Server. Once started, the dashboard should be accessible in your browser at http://localhost:3000

## Event-Driven AI Agent Platform

GreyCollar is a supervised AI agent that can be used to automate tasks, manage workflows, and provide insights. It is designed to be event-driven and can be integrated with various platforms and services.

## Features

### Teams and Colleagues

![Colleague Page](https://github.com/user-attachments/assets/0bd9cc8a-9305-4892-9d82-6a88338dda01)

![Organization Chart](https://github.com/user-attachments/assets/6a393d89-3e74-4433-89fa-2072b331f754)

### Async Chat

![Async Chat](https://github.com/user-attachments/assets/ed48676c-0537-4d51-b281-0f2a9193d1d3)

### Team Chat

![Team Chat](https://github.com/user-attachments/assets/d23ff8ed-2bd5-42f4-8401-6133a4abb6e5)

### AI Marketplace

![AI Marketplace](https://github.com/user-attachments/assets/8ad20c2a-756b-4a4f-87e2-483eb67454f2)

### Event API

```
Session
{
  id: uuid,
  appId: uuid,
  organizationId: uuid,
  projectId: uuid,
  userId: string,
  roles: string[],
  timestamp: timestamp,
}
```

```
SESSION.CUSTOMER_MESSAGED
{
  session: Session,
  content: string,
}
```

```
SESSION.AI_MESSAGED
{
  session: Session,
  content: string,
}
```
