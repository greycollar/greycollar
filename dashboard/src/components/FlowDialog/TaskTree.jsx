import CONSTANTS from "./utils";
import NodeBox from "./NodeBox";
import StyledTreeNode from "./TreeNode";

import { Box, Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import React, { useMemo } from "react";
import { Tree, TreeNode } from "react-organizational-chart";

const TaskTree = ({
  open,
  setOpen,
  treeData,
  lineColor,
  visibleNodes,
  loadingNodes,
  visibleLines,
}) => {
  const renderTree = useMemo(() => {
    const render = (node, depth = 0) => (
      <TreeNode
        key={node.nodeId}
        label={
          <StyledTreeNode>
            <NodeBox
              nodeData={node}
              visible={visibleNodes.includes(node.nodeId)}
              delay={depth * CONSTANTS.NODE_ANIMATION_DELAY}
              isLoading={loadingNodes.includes(node.nodeId)}
            />
          </StyledTreeNode>
        }
      >
        {node.children?.map((child, index) => (
          <React.Fragment key={child.nodeId}>
            {visibleLines.includes(`line-${depth}-${index}`) && (
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="100%"
                stroke={lineColor}
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            )}
            {render(child, depth + 1)}
          </React.Fragment>
        ))}
      </TreeNode>
    );
    return render;
  }, [visibleNodes, loadingNodes, visibleLines]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          textAlign: "center",
        }}
      >
        {`Task Flow`}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "2rem",
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Grid item xs={12} md={5}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Tree
              lineWidth="2px"
              lineColor={lineColor}
              lineBorderRadius="10px"
              lineStyle="dashed"
              label={
                <StyledTreeNode>
                  <NodeBox
                    nodeData={treeData}
                    visible={visibleNodes.includes(treeData.nodeId)}
                    delay={0}
                    isLoading={false}
                  />
                </StyledTreeNode>
              }
            >
              {treeData.children.map((child) => renderTree(child, 1))}
            </Tree>
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default TaskTree;
