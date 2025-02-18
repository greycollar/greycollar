import React from "react";

const CodeBlock = ({ children }) => {
  return (
    <code
      style={{
        backgroundColor: "#2e2e2e",
        color: "#f8f8f2",
        padding: "0.5em",
        borderRadius: "4px",
        display: "block",
      }}
    >
      {children}
    </code>
  );
};

export default CodeBlock;
