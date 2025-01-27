import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import React from "react";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";

import { Box, Button, Stack } from "@mui/material";

export default function StepComponent({
  activeStep,
  steps,
  stepExp,
  handleNext,
  handleBack,
  handleSave,
  children,
}) {
  return (
    <>
      <Stepper
        activeStep={activeStep}
        sx={{ backgroundColor: (theme) => theme.palette.background.default }}
      >
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step
              key={label}
              {...stepProps}
              sx={{
                backgroundColor: (theme) => theme.palette.background.default,
              }}
            >
              <StepLabel
                sx={{
                  backgroundColor: (theme) => theme.palette.background.default,
                }}
                {...labelProps}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Stack
        sx={{ backgroundColor: (theme) => theme.palette.background.default }}
      >
        <DialogContentText
          sx={{
            textAlign: "center",
            my: 2,
            mx: 5,
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          {stepExp[activeStep]}
        </DialogContentText>
      </Stack>
      {children}
      <DialogActions
        sx={{ backgroundColor: (theme) => theme.palette.background.default }}
      >
        <Button
          data-cy="colleague-back-button"
          variant="outlined"
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        {activeStep === 5 ? (
          <Button
            variant="contained"
            data-cy="colleague-finish-button"
            onClick={handleSave}
          >
            Finish
          </Button>
        ) : (
          <Button
            variant="outlined"
            data-cy="colleague-next-button"
            onClick={handleNext}
          >
            Next
          </Button>
        )}
      </DialogActions>
    </>
  );
}
