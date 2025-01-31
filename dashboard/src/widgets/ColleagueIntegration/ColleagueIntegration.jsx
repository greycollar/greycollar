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
      title: "Coding",
      description:
        "Expert in writing efficient code, creating seamless apps like Spotify delivers music.",
      logo: "logos:spotify-icon",
      acquired: true,
    },
    {
      title: "Communication",
      description:
        "Strong communication skills, connecting people like Instagram's creative platform.",
      logo: "skill-icons:instagram",
      acquired: true,
    },
    {
      title: "Problem-Solving",
      description:
        "Effective at solving challenges, similar to Google's innovative solutions.",
      logo: "logos:google-icon",
      acquired: true,
    },
    {
      title: "Teamwork",
      description:
        "Collaborates effectively, fostering synergy like Slack unites teams.",
      logo: "logos:slack-icon",
      acquired: true,
    },
    {
      title: "Marketing",
      description:
        "Drives results with creativity, like TikTok sets global trends.",
      logo: "logos:tiktok-icon",
      acquired: true,
    },
    {
      title: "Leadership",
      description:
        "Motivates teams to success, much like LinkedIn inspires growth.",
      logo: "logos:linkedin-icon",
      acquired: true,
    },
    {
      title: "Content Creation",
      description:
        "Produces engaging content, much like Netflix captivates its audience.",
      logo: "logos:netflix-icon",
      acquired: true,
    },
  ];

  const instructions = [
    "Clone the repository from GitHub.",
    "Install the necessary dependencies using `npm install`.",
    "Run the project using `npm start`.",
    "Follow the documentation for further integration steps.",
  ];

  const tabs = [{ title: "Incoming" }, { title: "Outgoing" }];

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
            {integrations.slice(0, 1).map((skill, index) => (
              <Integrations
                key={index}
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
            {integrations.map((skill, index) => (
              <Integrations
                key={index}
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
