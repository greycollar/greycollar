import DialogTitle from "@mui/material/DialogTitle";
import IconSelector from "../../components/IconSelector/IconSelector";
import React from "react";
import SparkleInput from "../../components/SparkleInput/SparkleInput";
import { Stack } from "@mui/material";
import StepComponent from "../../components/StepComponent/StepComponent";
import Summary from "../../components/ItemSummary/TeamSummary";
import { useOrganizations } from "../../hooks/useOrganizations";
import { useState } from "react";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";

function TeamWizard({ onSubmit, open, onClose }) {
  const { organizations, loading } = useOrganizations();
  const [organization, setOrganization] = useState({});
  const [team, setTeam] = useState({});

  const steps = ["Organization", "Team"];
  const stepExp = ["Create Organization", "Create Team."];

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSave = () => {
    onSubmit({ organization, team });
    onClose();
    setActiveStep(0);
  };

  const handleEmojiSelect = (emoji) => {
    setTeam((prevItem) => {
      return {
        ...prevItem,
        avatar: `:${emoji.id}:`,
        src: `${emoji.src}`,
      };
    });
  };

  const Organization = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <SparkleInput
            data-cy="team-wizard-org-name-input"
            prop="Organziaton Name"
            value={organization.name}
            onChange={(e) => setOrganization({ name: e.target.value })}
          />
        </div>
        {organizations.length > 0 && (
          <div>
            <Typography variant="body2" gutterBottom textAlign={"center"}>
              or Choose Existing Organization
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "16px",
                marginTop: "16px",
              }}
            >
              {organizations.map((organization) => (
                <Card
                  key={organization.id}
                  onClick={() => {
                    setOrganization({
                      name: organization.name,
                      id: organization.id,
                    });
                    setActiveStep(activeStep + 1);
                  }}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardActionArea>
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          marginBottom: "8px",
                        }}
                      >
                        <Typography variant="h6" component="div">
                          {organization.name}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          </div>
        )}
      </div>
    );
  };

  const Name = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <SparkleInput
            data-cy="colleague-wizard-name-input"
            prop="Team Name"
            value={team.name}
            onChange={(e) => setTeam({ name: e.target.value })}
          />
        </div>
      </div>
    );
  };

  const StepPages = () => {
    switch (activeStep) {
      case 0:
        return <Organization />;
      case 1:
        return (
          <Stack spacing={2}>
            <Name />
            <IconSelector
              handleEmojiSelect={handleEmojiSelect}
              avatarSrc={team.src}
              avatar={team?.avatar?.replace(/:/g, "")}
            />
          </Stack>
        );
      case 2:
        return <Summary team={team} organization={organization} />;
    }
  };
  return (
    <Dialog
      fullWidth
      maxWidth={activeStep === 4 ? "xl" : "sm"}
      open={open}
      onClose={() => {
        if (organizations.length !== 0) {
          onClose();
          setActiveStep(0);
        }
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
