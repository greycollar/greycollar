import EnginesChart from "./AIMarketplaceCard";
import { IconButton } from "@mui/material";
import { Iconify } from "@nucleoidai/platform/minimal/components";
import { useState } from "react";

function AIMarketplaceButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton
        sx={{
          bgcolor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.text.primary,
        }}
        onClick={() => setOpen(!open)}
        variant="contained"
      >
        <Iconify icon={"codicon:organization"} width={24} />
      </IconButton>
      <EnginesChart 
        open={open} 
        setOpen={setOpen} 
        isWizardEngine={false} 
        handleEngineSelect={() => {}} 
      />
    </>
  );
}

export default AIMarketplaceButton;
