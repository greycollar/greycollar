import cafe from "../../../media/ProjectIcons/cafe.png";
import { useState } from "react";

const useMock = () => {
  const team = {
    id: "1",
    name: "Imagine Coffee Shop Team",
    icon: cafe,
    companyId: "dfb990bb-81dd-4584-82ce-050eb8f6a12f",
  };

  const [chat, setChat] = useState([
    {
      sender: "Human",
      content: "what is 2 + 2?",
    },
    {
      sender: "AI",
      content: "It is 4",
    },
    { sender: "SYSTEM", content: "action" },
    {
      sender: "AI",
      content: "Hey, are you still there?",
    },
  ]);

  const sendMessage = (message) => {
    setChat([...chat, { sender: "Human", content: message.content }]);
  };

  const colleagues = [
    {
      id: "00db1bd4-4829-40f2-8b99-d2e42342157e",
      name: "Ava",
      avatar: "/avatars/ava.png",
      character: "Funny, friendly, and a coffee lover",
      role: "Barista Expert",
      teamId: "1",
    },
    {
      id: "2",
      name: "Jane Doe",
      email: "janedoe@example.com",
      character: "Serious",
      role: "Manager",
      companyId: "abc123",
      teamId: "1",
    },
    {
      id: "3",
      name: "Paul Bunyan",
      email: "paulbunyan@example.com",
      character: "Strong",
      role: "Lumberjack",
      companyId: "abc123",
      teamId: "1",
    },
    {
      id: "4",
      name: "Johnny Appleseed",
      email: "johnnyappleseed@example.com",
      character: "Nature-loving",
      role: "Gardener",
      companyId: "abc123",
      teamId: "1",
    },
    {
      id: "5",
      name: "Davy Crockett",
      email: "davycrockett@example.com",
      character: "Adventurous",
      role: "Explorer",
      companyId: "abc123",
      teamId: "2",
    },
    {
      id: "6",
      name: "Calamity Jane",
      email: "calamityjane@example.com",
      character: "Bold",
      role: "Sharpshooter",
      companyId: "abc123",
      teamId: "2",
    },
  ];

  return { team, chat, colleagues, sendMessage };
};

export default useMock;
