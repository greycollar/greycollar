import OrganizationalChart from "./Content";
import React from "react";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";

function OrganizationChart({ open, setOpen }) {
  const Content = () => {
    return (
      <DialogContent sx={{ margin: 5 }} data-cy="organization-chart">
        <DialogTitle variant="h4">Organizational Chart</DialogTitle>

        <OrganizationalChart
          sx={{ margin: 0.2 }}
          variant="standard"
          lineHeight="15px"
        />
      </DialogContent>
    );
  };

  return (
    <>
      <Dialog maxWidth={"xl"} open={open} onClose={() => setOpen(false)}>
        {Content()}
      </Dialog>
    </>
  );
}
export default OrganizationChart;
