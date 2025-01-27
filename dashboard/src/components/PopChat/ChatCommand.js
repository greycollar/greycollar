import PsychologyIcon from "@mui/icons-material/Psychology";

const ChatCommands = [
  {
    command: "/learn-url",
    icon: PsychologyIcon,
    description: "Learn from given url.",
    inputs: [
      {
        title: "Enter URL",
        type: "TEXT",
      },
    ],
    action: () => {},
  },
  {
    command: "/learn-text",
    icon: PsychologyIcon,
    description: "Learn with text",
    inputs: [
      {
        title: "Enter TEXT",
        type: "TEXT",
      },
    ],
    action: () => {},
  },
];

export default ChatCommands;
