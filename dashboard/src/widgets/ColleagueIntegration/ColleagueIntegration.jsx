import IncomingDrawer from "../../components/IncomingDrawer/IncomingDrawer";
import IntegrationTabs from "../../components/IntegrationTabs/IntegrationTabs";
import Integrations from "../../components/Integrations/Integrations";
import React from "react";
import SkillDialog from "../../components/Skills/SkillDialog";
import { storage } from "@nucleoidjs/webstorage";
import useColleagues from "../../hooks/useColleagues";
import useTeam from "../../hooks/useTeam";

import { Box, Container, Grid } from "@mui/material";

const ColleagueIntegration = () => {
  const integrations = [
    {
      id: "8e62c90f-1f37-4ba3-b968-340f124bd4d4",
      title: "Coding",
      description:
        "Expert in writing efficient code, creating seamless apps like Spotify delivers music.",
      logo: "logos:spotify-icon",
      acquired: true,
    },
    {
      id: "7920fcf9-6156-43b3-9bd1-46afa3f2d5a6",
      title: "Communication",
      description:
        "Strong communication skills, connecting people like Instagram's creative platform.",
      logo: "skill-icons:instagram",
      acquired: true,
    },
    {
      id: "d5f8c3e7-1b4b-4e7c-b8d3-9e9b5f8e4c6d",
      title: "Problem-Solving",
      description:
        "Effective at solving challenges, similar to Google's innovative solutions.",
      logo: "logos:google-icon",
      acquired: true,
    },
    {
      id: "e7c8f9a3-8d7b-4a9b-9a8e-7d8f9b3e4a6c",
      title: "Teamwork",
      description:
        "Collaborates effectively, fostering synergy like Slack unites teams.",
      logo: "logos:slack-icon",
      acquired: true,
    },
    {
      id: "b9c8d7e6-5f4a-4b8d-9e8f-6c7d8f9b4a7e",
      title: "Marketing",
      description:
        "Drives results with creativity, like TikTok sets global trends.",
      logo: "logos:tiktok-icon",
      acquired: true,
    },
    {
      id: "a7b9c8d6-5f4e-4a7b-9d8f-6e7d8f9a4c6d",
      title: "Leadership",
      description:
        "Motivates teams to success, much like LinkedIn inspires growth.",
      logo: "logos:linkedin-icon",
      acquired: true,
    },
    {
      id: "9e8f7d6c-5b4a-4d8e-9a7b-6c7d8f9b5a6e",
      title: "Content Creation",
      description:
        "Produces engaging content, much like Netflix captivates its audience.",
      logo: "logos:netflix-icon",
      acquired: true,
    },
  ];

  const instructions = [
    {
      id: "1",
      instruction: "Clone the repository from GitHub.",
    },
    {
      id: "2",
      instruction: "Install the necessary dependencies using `npm install`.",
    },
    {
      id: "3",
      instruction: "Run the project using `npm start`.",
    },
    {
      id: "4",
      instruction: "Follow the documentation for further integration steps.",
    },
  ];

  const tabs = [
    { id: "8a9b0c1d-2e3f-4g5h-6i7j-8k9l0m1n2o3p", title: "Incoming" },
    { id: "7a8b9c0d-1e2f-3g4h-5i6j-7k8l9m0n1o2p", title: "Outgoing" },
  ];

  const teamId = storage.get("projectId");

  const { teamById } = useTeam(teamId);

  const { colleagues } = useColleagues();

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [skillDialogOpen, setSkillDialogOpen] = React.useState(false);
  const [selectedSkill, setSelectedSkill] = React.useState([]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    if (selectedTab === 0) {
      setDrawerOpen(true);
    } else {
      setSkillDialogOpen(true);
    }
  };

  const handleSkillDialogClose = () => {
    setSkillDialogOpen(false);
    setSelectedSkill([]);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedSkill([]);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <IntegrationTabs
          selectedTab={selectedTab}
          handleTabChange={handleTabChange}
          tabs={tabs}
        />

        {selectedTab === 0 && (
          <Grid container spacing={2}>
            {integrations.slice(0, 1).map((skill) => (
              <Integrations
                key={skill.id}
                title={skill.title}
                description={skill.description}
                logo={skill.logo}
                acquired={skill.acquired}
                onSkillClick={handleSkillClick}
              />
            ))}
          </Grid>
        )}

        {selectedTab === 1 && (
          <Grid container spacing={2}>
            {integrations.map((skill) => (
              <Integrations
                key={skill.id}
                title={skill.title}
                description={skill.description}
                logo={skill.logo}
                acquired={skill.acquired}
                onSkillClick={handleSkillClick}
              />
            ))}
          </Grid>
        )}

        <SkillDialog
          open={skillDialogOpen}
          handleClose={handleSkillDialogClose}
          skill={selectedSkill}
          team={teamById}
          colleagues={colleagues}
        />

        <IncomingDrawer
          selectedSkill={selectedSkill}
          instructions={instructions}
          drawerOpen={drawerOpen}
          handleDrawerClose={handleDrawerClose}
          colleagues={colleagues}
        />
      </Box>
    </Container>
  );
};

export default ColleagueIntegration;
