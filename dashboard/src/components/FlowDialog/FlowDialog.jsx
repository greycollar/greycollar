import CONSTANTS from "./utils";
import TaskTree from "./TaskTree";

import React, { useEffect, useMemo, useState } from "react";

const FlowDialog = ({ open, setOpen, steps }) => {
  const [lineColor, setLineColor] = useState(CONSTANTS.LINE_COLORS.DEFAULT);
  const [visibleNodes, setVisibleNodes] = useState([]);
  const [loadingNodes, setLoadingNodes] = useState([]);
  const [visibleLines, setVisibleLines] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      setVisibleNodes([]);
      setLoadingNodes([]);
      setVisibleLines([]);
      setIsAnimating(true);
      setLineColor(CONSTANTS.LINE_COLORS.DEFAULT);
    }
  }, [open]);

  const treeData = useMemo(() => {
    if (!steps || steps.length === 0) return null;

    const sortedSteps = [...steps].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    const root = {
      ...sortedSteps[0],
      nodeId: `node-0`,
      children: [],
    };

    let currentNode = root;
    for (let i = 1; i < sortedSteps.length; i++) {
      const newNode = {
        ...sortedSteps[i],
        nodeId: `node-${i}`,
        children: [],
      };
      currentNode.children = [newNode];
      currentNode = newNode;
    }

    return root;
  }, [steps]);

  const getAllNodeIds = (node, ids = [], skipFirst = true) => {
    if (!node) return ids;
    if (!skipFirst) {
      ids.push(node.nodeId);
    }
    node.children?.forEach((child) => getAllNodeIds(child, ids, false));
    return ids;
  };

  useEffect(() => {
    if (isAnimating && treeData) {
      setVisibleNodes((prev) => [...prev, treeData.nodeId]);

      const nodeIds = getAllNodeIds(treeData);
      let currentIndex = 0;

      const showNextNode = () => {
        if (currentIndex >= nodeIds.length) {
          setLineColor(CONSTANTS.LINE_COLORS.ACTIVE);
          setIsAnimating(false);
          return;
        }

        const currentNodeId = nodeIds[currentIndex];

        setTimeout(() => {
          setVisibleNodes((prev) => [...prev, currentNodeId]);
          setLoadingNodes((prev) => [...prev, currentNodeId]);
          if (currentIndex > 0) {
            setVisibleLines((prev) => [...prev, `line-${currentIndex - 1}`]);
          }
        }, currentIndex * (CONSTANTS.NODE_ANIMATION_DELAY + CONSTANTS.LOADING_DURATION));

        setTimeout(() => {
          setLoadingNodes((prev) => prev.filter((id) => id !== currentNodeId));

          currentIndex++;
          showNextNode();
        }, (currentIndex + 1) * (CONSTANTS.NODE_ANIMATION_DELAY + CONSTANTS.LOADING_DURATION));
      };

      showNextNode();
    }
  }, [isAnimating, treeData]);

  if (!treeData) return null;

  return (
    <TaskTree
      open={open}
      setOpen={setOpen}
      treeData={treeData}
      lineColor={lineColor}
      visibleNodes={visibleNodes}
      loadingNodes={loadingNodes}
      visibleLines={visibleLines}
    />
  );
};

export default FlowDialog;
