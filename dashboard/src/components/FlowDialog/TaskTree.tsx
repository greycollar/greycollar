import CONSTANTS from "./utils";
import NodeBox from "./NodeBox";
import StyledTreeNode from "./TreeNode";

import { Box, Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import React, { useMemo } from "react";
import { Tree, TreeNode } from "react-organizational-chart";

const TaskTree = ({ open, setOpen, treeData, visibleNodes, loadingNodes }) => {
  const renderTree = useMemo(() => {
    const render = (node) => (
      <TreeNode
        key={node.nodeId}
        label={
          <StyledTreeNode>
            <NodeBox
              nodeData={node}
              visible={visibleNodes.includes(node.nodeId)}
              delay={0}
              isLoading={loadingNodes.includes(node.nodeId)}
            />
          </StyledTreeNode>
        }
      >
        {node.children?.map((child) => render(child))}
      </TreeNode>
    );
    return render;
  }, [visibleNodes, loadingNodes]);

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
              lineColor={CONSTANTS.LINE_COLORS.ACTIVE}
              lineBorderRadius="10px"
              lineStyle="dashed"
              label={
                <StyledTreeNode>
                  <NodeBox
                    nodeData={treeData}
                    visible={visibleNodes.includes(treeData.nodeId)}
                    delay={0}
                    isLoading={loadingNodes.includes(treeData.nodeId)} // Use loadingNodes for root node
                  />
                </StyledTreeNode>
              }
            >
              {treeData.children.map((child) => renderTree(child))}
            </Tree>
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default TaskTree;
