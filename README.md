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

## Event-Driven AI Agent Platform

GreyCollar is a supervised AI agent that can be used to automate tasks, manage workflows, and provide insights. It is designed to be event-driven and can be integrated with various platforms and services.

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
