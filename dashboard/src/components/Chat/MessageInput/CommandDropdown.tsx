import React, { useState } from "react";

const CommandDropdown = ({ commands, onSelect }) => {
  const [hoveredCommand, setHoveredCommand] = useState(null);

  return (
    <div style={{}} data-testid="command-dropdown">
      {commands.map((command) => (
        <div
          data-command={command.name}
          key={command.name}
          onClick={() => onSelect(command)}
          onMouseEnter={() => setHoveredCommand(command.name)}
          onMouseLeave={() => setHoveredCommand(null)}
          style={{
            color: "white",
            padding: "10px 16px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderBottom: "1px solid #40444B",
            backgroundColor:
              hoveredCommand === command.name ? "#202225" : undefined,
          }}
        >
          <span style={{ marginRight: "8px", fontSize: "24px" }}>
            <command.icon />
          </span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontWeight: "bold" }}>{command.name}</div>
            <div style={{ fontSize: "14px" }}>{command.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommandDropdown;
