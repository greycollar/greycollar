import React from "react";

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "box":
      return (
        <span
          {...attributes}
          style={{
            backgroundColor: "#333",
            border: "1px solid black",
            padding: "2px",
            display: "inline-block",
          }}
        >
          <span
            contentEditable={false}
            style={{
              color: "white",
              paddingRight: "8px",
              whiteSpace: "pre",
            }}
          >
            {element.prompt}:
          </span>
          <span
            style={{
              backgroundColor: "#7289da",
              padding: "2px 8px",
              display: "inline-block",
            }}
          >
            {children}
          </span>
        </span>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export default Element;
