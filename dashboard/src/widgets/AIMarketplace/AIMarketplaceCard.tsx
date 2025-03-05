import AIEngineChart from "./Content";
import React from "react";
import useAIEngines from "../../hooks/useAIEngines";

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

function AIMarketplaceCard({
  open,
  setOpen,
  isWizardEngine,
  handleEngineSelect,
}) {
  const { engines } = useAIEngines();

  const Content = () => {
    return (
      <DialogContent sx={{ marginY: 2 }}>
        <DialogTitle textAlign={"center"} variant="h4">
          AI Marketplace
        </DialogTitle>

        <TextField
          sx={{ mb: 3 }}
          fullWidth
          variant="outlined"
          placeholder="Search..."
        />

        <AIEngineChart
          handleEngineSelect={handleEngineSelect}
          isWizardEngine={isWizardEngine}
          data={engines}
        />
      </DialogContent>
    );
  };

  return (
    <>
      {isWizardEngine ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Content()}
        </Box>
      ) : (
        <Dialog maxWidth={"xl"} open={open} onClose={() => setOpen(false)}>
          {Content()}
        </Dialog>
      )}
    </>
  );
}

export default AIMarketplaceCard;
