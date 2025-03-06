import { Container } from "@mui/material";
import React from "react";

import { Canvas, Edge, Node } from "reaflow";

const ReaFlow = () => {
  const nodes = [
    {
      id: "1",
      text: "Slack Integration",
      height: 80,
      icon: {
        url: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/306_Slack_logo-1024.png",
        width: 24,
        height: 24,
      },
    },
    {
      id: "2",
      text: "Trigger Event",
      height: 80,
      icon: {
        url: "https://cdn-icons-png.flaticon.com/512/1828/1828970.png",
        width: 24,
        height: 24,
      },
    },
    {
      id: "3",
      text: "Fetch Data",
      height: 80,
      icon: {
        url: "https://cdn-icons-png.flaticon.com/512/3602/3602123.png",
        width: 24,
        height: 24,
      },
    },
    {
      id: "4",
      text: "Process Data",
      height: 80,
      icon: {
        url: "https://cdn-icons-png.flaticon.com/512/3209/3209265.png",
        width: 24,
        height: 24,
      },
    },
    {
      id: "5",
      text: "Decision Making",
      height: 80,
      icon: {
        url: "https://cdn-icons-png.flaticon.com/512/1998/1998613.png",
        width: 24,
        height: 24,
      },
    },
    {
      id: "6",
      text: "Send Notification",
      height: 80,
      icon: {
        url: "https://cdn-icons-png.flaticon.com/512/1827/1827342.png",
        width: 24,
        height: 24,
      },
    },
    {
      id: "7",
      text: "Complete Workflow",
      height: 80,
      icon: {
        url: "https://cdn-icons-png.flaticon.com/512/1828/1828765.png",
        width: 24,
        height: 24,
      },
    },
  ];

  const edges = [
    {
      id: "1-2",
      from: "1",
      to: "2",
      text: "Connecting",
    },
    {
      id: "2-3",
      from: "2",
      to: "3",
      text: "Triggered",
    },
    {
      id: "3-4",
      from: "3",
      to: "4",
      text: "Data Fetched",
    },
    {
      id: "3-5",
      from: "3",
      to: "5",
      text: "Data Fetched",
    },
    {
      id: "5-6",
      from: "5",
      to: "6",
      text: "Notification Sent",
    },
    {
      id: "4-6",
      from: "4",
      to: "6",
      text: "Notification Sent",
    },

    {
      id: "6-7",
      from: "6",
      to: "7",
      text: "Workflow Completed",
    },
  ];
  return (
    <Container>
      <Canvas
        direction={"RIGHT"}
        fit={true}
        nodes={nodes}
        edges={edges}
        node={(node) => (
          <Node
            style={{
              stroke: "#212B36",
              fill: "212B36",
              strokeWidth: 1,
            }}
            label={null}
          >
            <foreignObject width={node.width} height={node.height}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <img
                  src={node.properties.icon.url}
                  width={node.properties.icon.width}
                  height={node.properties.icon.height}
                  alt={node.properties.text}
                  style={{ marginBottom: 8 }}
                />

                <div style={{ marginTop: 2 }}>{node.properties.text}</div>
              </div>
            </foreignObject>
          </Node>
        )}
      />
    </Container>
  );
};

export default ReaFlow;
