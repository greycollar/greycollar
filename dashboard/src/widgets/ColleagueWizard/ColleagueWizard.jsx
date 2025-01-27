import ColleagueSummary from "../../components/ItemSummary/ItemSummary";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EnginesChart from "../AIMarketplace/AIMarketplaceCard";
import React from "react";
import SelectAvatar from "../../components/AvatarSelector/AvatarSelector";
import SparkleInput from "../../components/SparkleInput/SparkleInput";
import StepComponent from "../../components/StepComponent/StepComponent";

import { useEffect, useState } from "react";

function ColleagueWizard({
  itemProperties,
  onSubmit,
  open,
  onClose,
  itemToEdit,
}) {
  const steps = ["Name", "Avatar", "Character", "Role", "Engine", "Summary"];
  const stepExp = [
    "Give colleague a name.",
    "Select an avatar that reflects your colleague.",
    "Write down your colleague's eole. this will determine your colleague's behavior.",
    "Write your colleague's role. this will determine your colleague's role.",
    "Select your colleague's engine. this will determine your colleague's engine.",
  ];

  const names = [
    "Liam",
    "Olivia",
    "Noah",
    "Emma",
    "Ava",
    "Elijah",
    "Sophia",
    "James",
    "Isabella",
    "Mason",
  ];
  const characters = [
    "Brave",
    "Quick-Witted",
    "Mysterious",
    "Loyal Companion",
    "Charismatic",
    "Deep Thinker",
    "Strong-Willed",
    "Ambitious",
    "Free Spirit",
    "Natural Leader",
  ];
  const roles = [
    "Scientist",
    "Detective",
    "Journalist",
    "Architect",
    "Chef",
    "Teacher",
    "Engineer",
    "Pilot",
    "Artist",
    "Paramedic",
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

  const handleRandomValue = (property) => {
    let randomValue;
    switch (property) {
      case "name":
        randomValue = names[Math.floor(Math.random() * names.length)];
        break;
      case "character":
        randomValue = characters[Math.floor(Math.random() * characters.length)];
        break;
      case "role":
        randomValue = roles[Math.floor(Math.random() * roles.length)];
        break;
      default:
        randomValue = "";
    }
    setNewItem((prev) => ({ ...prev, [property]: randomValue }));
  };

  const Name = () => {
    return (
      <SparkleInput
        data-cy="colleague-wizard-name-input"
        prop="name"
        value={newItem["name"]}
        onChange={handleInputChange("name")}
        onRandomValue={() => handleRandomValue("name")}
      />
    );
  };

  const Personality = () => {
    return (
      <SparkleInput
        data-cy="colleague-wizard-character-input"
        prop="character"
        onChange={handleInputChange("character")}
        onRandomValue={() => handleRandomValue("character")}
        value={newItem["character"]}
        multiline
        rows={11}
      />
    );
  };

  const Responsibility = () => {
    return (
      <SparkleInput
        data-cy="colleague-wizard-role-input"
        prop="role"
        onChange={handleInputChange("role")}
        onRandomValue={() => handleRandomValue("role")}
        value={newItem["role"]}
        multiline
        rows={11}
      />
    );
  };

  const handleEngineSelect = (engine) => {
    setNewItem((prevItem) => ({
      ...prevItem,
      aiEngineId: engine.id,
      engineName: engine.vendor,
    }));
    handleNext();
  };

  const StepPages = () => {
    switch (activeStep) {
      case 0:
        return Name();
      case 1:
        return (
          <SelectAvatar
            handleEmojiSelect={handleEmojiSelect}
            avatarSrc={newItem.src}
            avatar={newItem?.avatar?.replace(/:/g, "")}
          />
        );
      case 2:
        return Personality();
      case 3:
        return Responsibility();
      case 4:
        return (
          <EnginesChart
            handleEngineSelect={handleEngineSelect}
            isWizardEngine={true}
          />
        );
      case 5:
        return <ColleagueSummary newItem={newItem} />;
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

export default ColleagueWizard;
