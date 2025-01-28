import { Icon } from "@iconify/react";
import SkillDialog from "../../components/Skills/SkillDialog";
import Skills from "../../components/Skills/Skills";
import { storage } from "@nucleoidjs/webstorage";
import useColleagues from "../../hooks/useColleagues";
import useTeam from "../../hooks/useTeam";

import {
  Box,
  Card,
  Container,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const mockData = [
  {
    title: "Coding",
    description:
      "Expert in writing efficient code, creating seamless apps like Spotify delivers music.",
    logo: "logos:spotify-icon",
    acquired: true,
  },
  {
    title: "Data Analysis",
    description:
      "Skilled in uncovering insights, much like YouTube’s personalized recommendations.",
    logo: "logos:youtube-icon",
    acquired: false,
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
    title: "Marketing",
    description:
      "Delivers exceptional service, echoing Zendesk's customer focus.",
    logo: "logos:tiktok-icon",
    acquired: false,
  },
  {
    title: "Leadership",
    description:
      "Motivates teams to success, much like LinkedIn inspires growth.",
    logo: "logos:linkedin-icon",
    acquired: true,
  },
  {
    title: "Problem-Solving",
    description:
      "Brings fresh ideas to the table, much like Pinterest inspires endless possibilities.",
    logo: "logos:google-icon",
    acquired: false,
  },
  {
    title: "Teamwork",
    description:
      "Pioneers new solutions, echoing Tesla's drive for technological advancement.",
    logo: "logos:slack-icon",
    acquired: false,
  },
  {
    title: "Leadership",
    description:
      "Excels in managing time effectively, much like Trello organizes tasks seamlessly.",
    logo: "logos:linkedin-icon",
    acquired: false,
  },
  {
    title: "Data Analysis",
    description:
      "Skilled in online sales strategies, much like Amazon’s mastery of global commerce.",
    logo: "logos:youtube-icon",
    acquired: false,
  },
  {
    title: "Content Creation",
    description:
      "Crafts visually stunning experiences, much like Canva empowers creativity.",
    logo: "logos:netflix-icon",
    acquired: false,
  },
  {
    title: "Content Creation",
    description:
      "Produces engaging content, much like Netflix captivates its audience.",
    logo: "logos:netflix-icon",
    acquired: true,
  },
  {
    title: "Communication",
    description:
      "Masters the art of numbers, similar to Tableau's visual storytelling with data.",
    logo: "skill-icons:instagram",
    acquired: false,
  },
  {
    title: "Coding",
    description:
      "Builds loyal audiences, much like Spotify retains its subscribers with unique experiences.",
    logo: "logos:spotify-icon",
    acquired: false,
  },
];

const mockIntegrations = [
  {
    title: "Coding",
    logo: "logos:spotify-icon",
    provider: "Spotify",
  },
  {
    title: "Data Analysis",
    logo: "logos:youtube-icon",
    provider: "YouTube",
  },
  {
    title: "Communication",
    logo: "skill-icons:instagram",
    provider: "Instagram",
  },
  {
    title: "Problem-Solving",
    logo: "logos:google-icon",
    provider: "Google",
  },
  {
    title: "Teamwork",
    logo: "logos:slack-icon",
    provider: "Slack",
  },
  {
    title: "Marketing",
    logo: "logos:tiktok-icon",
    provider: "Tiktok",
  },
  {
    title: "Leadership",
    logo: "logos:linkedin-icon",
    provider: "LinkedIn",
  },
  {
    title: "Content Creation",
    logo: "logos:netflix-icon",
    provider: "Netflix",
  },
];

const IntegrationWidget = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [relatedSkills, setRelatedSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [skillDialogOpen, setSkillDialogOpen] = useState(false);

  const teamId = storage.get("projectId");

  const { teamById } = useTeam(teamId);

  const { colleagues } = useColleagues();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpen = (integration) => {
    setSelectedIntegration(integration);
    const matchingSkills = mockData.filter(
      (skill) => skill.title === integration.title
    );
    setRelatedSkills(matchingSkills);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedIntegration(null);
    setRelatedSkills([]);
  };

  const filteredData = mockData.filter((skill) =>
    skill.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredIntegrations = mockIntegrations.filter((skill) =>
    skill.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setSkillDialogOpen(true);
  };

  const handleSkillDialogClose = () => {
    setSkillDialogOpen(false);
    setSelectedSkill(null);
  };

  return (
    <Container>
      <TextField
        sx={{ mb: 3 }}
        fullWidth
        variant="outlined"
        placeholder="Search desired integrations for your teams or colleagues"
        value={searchTerm}
        autoComplete="off"
        onChange={handleSearchChange}
      />

      <Grid container spacing={1} sx={{ mb: 2 }}>
        {searchTerm &&
          filteredIntegrations.map((integration, index) => (
            <Grid key={`integration-${index}`} item xs={12} sm={6} md={2}>
              <Card
                sx={{
                  height: 160,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)", cursor: "pointer" },
                }}
                onClick={() => handleOpen(integration)}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Icon
                    icon={integration.logo.replace(/^:|:$/g, "")}
                    width="40"
                    height="40"
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {integration.provider}
                  </Typography>

                  <Typography variant="h6">{integration.title}</Typography>
                </Box>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Grid container spacing={2}>
        {filteredData.map((skill, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Skills
              title={skill.title}
              description={skill.description}
              logo={skill.logo}
              onSkillClick={handleSkillClick}
              acquired={skill.acquired}
            />
          </Grid>
        ))}
      </Grid>

      <SkillDialog
        open={skillDialogOpen}
        handleClose={handleSkillDialogClose}
        skill={selectedSkill}
        team={teamById}
        colleagues={colleagues}
      />

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            maxHeight: "80vh",
            bgcolor: "background.paper",
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
            overflow: "auto",
          }}
        >
          {selectedIntegration && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Icon icon={selectedIntegration.logo} width="40" height="40" />
                <Typography variant="h5" component="h2" sx={{ ml: 2 }}>
                  {selectedIntegration.title}
                </Typography>
                <Typography variant="h5" component="h2" sx={{ ml: 30 }}>
                  {selectedIntegration.provider}
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Related Skills
              </Typography>
              <Grid container spacing={2}>
                {relatedSkills.map((skill, index) => (
                  <Grid item xs={6} key={index}>
                    <Skills
                      title={skill.title}
                      description={skill.description}
                      logo={skill.logo}
                      onSkillClick={handleSkillClick}
                      acquired={skill.acquired}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default IntegrationWidget;
