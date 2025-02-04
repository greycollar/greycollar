import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconSelector from "../../components/IconSelector/IconSelector";
import React from "react";
import SparkleInput from "../../components/SparkleInput/SparkleInput";
import { Stack } from "@mui/material";
import StepComponent from "../../components/StepComponent/StepComponent";
import TeamSummary from "../../components/ItemSummary/TeamSummary";

import { useEffect, useState } from "react";

function TeamWizard({ itemProperties, onSubmit, open, onClose, itemToEdit }) {
  const steps = ["Organization", "Team", "Description"];
  const stepExp = [
    "Give team a name.",
    "Select an icon that reflects your team.",
    "Write your team's Description.",
  ];

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [newItem, setNewItem] = useState(
    itemProperties.reduce((obj, property) => ({ ...obj, [property]: "" }), {})
  );

  useEffect(() => {
    if (itemToEdit) {
      setNewItem(itemToEdit);
    } else if (!open) {
      setNewItem(
        itemProperties.reduce(
          (obj, property) => ({ ...obj, [property]: "" }),
          {}
        )
      );
    }
  }, [open, itemProperties, itemToEdit]);

  const handleSave = () => {
    if (newItem.id) {
      onSubmit(newItem);
    } else {
      onSubmit(newItem);
    }
    onClose();
    setActiveStep(0);
  };

  const handleEmojiSelect = (emoji) => {
    setNewItem((prevItem) => {
      return {
        ...prevItem,
        avatar: `:${emoji.id}:`,
        src: `${emoji.src}`,
      };
    });
  };

  const handleInputChange = (property) => (event) => {
    setNewItem({ ...newItem, [property]: event.target.value });
  };

  const Name = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <SparkleInput
            data-cy="colleague-wizard-name-input"
            prop="name"
            value={newItem["name"]}
            onChange={handleInputChange("name")}
          />
        </div>
      </div>
    );
  };

  const StepPages = () => {
    switch (activeStep) {
      case 0:
        return <></>;
      case 1:
        return (
          <Stack spacing={2}>
            <Name />
            <IconSelector
              handleEmojiSelect={handleEmojiSelect}
              avatarSrc={newItem.src}
              avatar={newItem?.avatar?.replace(/:/g, "")}
            />
          </Stack>
        );
      case 2:
        return <></>;
      case 3:
        return <TeamSummary newItem={newItem} />;
    }
  };
  return (
    <Dialog
      fullWidth
      maxWidth={activeStep === 4 ? "xl" : "sm"}
      open={open}
      onClose={() => {
        onClose();
        setActiveStep(0);
      }}
    >
      <>
        <DialogTitle
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        ></DialogTitle>
        <StepComponent
          activeStep={activeStep}
          steps={steps}
          stepExp={stepExp}
          handleNext={handleNext}
          handleBack={handleBack}
          handleSave={handleSave}
        >
          <DialogContent
            sx={{
              height: "100%",
              alignContent: "center",
              justifyContent: "center",
              backgroundColor: (theme) => theme.palette.background.default,
            }}
          >
            {StepPages()}
          </DialogContent>
        </StepComponent>
      </>
    </Dialog>
  );
}

export default TeamWizard;
