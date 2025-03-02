import AIMarketplaceItem from "./AIMarketplaceItem";
import { Box } from "@mui/material";

export default function AIEngineChart({
  sx,
  data,
  isWizardEngine,
  handleEngineSelect,
}) {
  return (
    <>
      <Box
        sx={sx}
        gap={2}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
      >
        {data.map((engine) => (
          <AIMarketplaceItem
            handleEngineSelect={handleEngineSelect}
            isWizardEngine={isWizardEngine}
            key={engine.id}
            engine={engine}
          />
        ))}
      </Box>
    </>
  );
}
