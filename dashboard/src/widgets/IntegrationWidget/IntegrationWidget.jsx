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
    id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    title: "Coding",
    description:
      "Expert in writing efficient code, creating seamless apps like Spotify delivers music.",
    logo: "logos:spotify-icon",
    acquired: true,
  },
  {
    id: "6p5o4n3m-2l1k-0j9i-8h7g-6f5e4d3c2b1a",
    title: "Data Analysis",
    description:
      "Skilled in uncovering insights, much like YouTube’s personalized recommendations.",
    logo: "logos:youtube-icon",
    acquired: false,
  },
  {
    id: "7p6o5n4m-3l2k-1j0i-9h8g-7f6e5d4c3b2a",
    title: "Communication",
    description:
      "Strong communication skills, connecting people like Instagram's creative platform.",
    logo: "skill-icons:instagram",
    acquired: true,
  },
  {
    id: "5p4o3n2m-1l0k-9j8i-7h6g-5f4e3d2c1b0a",
    title: "Problem-Solving",
    description:
      "Effective at solving challenges, similar to Google's innovative solutions.",
    logo: "logos:google-icon",
    acquired: true,
  },
  {
    id: "2a3b4c5d-6e7f-8g9h-0i1j-2k3l4m5n6o7p",
    title: "Teamwork",
    description:
      "Collaborates effectively, fostering synergy like Slack unites teams.",
    logo: "logos:slack-icon",
    acquired: true,
  },
  {
    id: "8q7r6s5t-4u3v-2w1x-0y9z-8a7b6c5d4e3f",
    title: "Marketing",
    description:
      "Drives results with creativity, like TikTok sets global trends.",
    logo: "logos:tiktok-icon",
    acquired: true,
  },
  {
    id: "9q8r7s6t-5u4v-3w2x-1y0z-9a8b7c6d5e4f",
    title: "Marketing",
    description:
      "Delivers exceptional service, echoing Zendesk's customer focus.",
    logo: "logos:tiktok-icon",
    acquired: false,
  },
  {
    id: "3a4b5c6d-7e8f-9g0h-1i2j-3k4l5m6n7o8p",
    title: "Leadership",
    description:
      "Motivates teams to success, much like LinkedIn inspires growth.",
    logo: "logos:linkedin-icon",
    acquired: true,
  },
  {
    id: "4a5b6c7d-8e9f-0g1h-2i3j-4k5l6m7n8o9p",
    title: "Problem-Solving",
    description:
      "Brings fresh ideas to the table, much like Pinterest inspires endless possibilities.",
    logo: "logos:google-icon",
    acquired: false,
  },
  {
    id: "0a1b2c3d-4e5f-6g7h-8i9j-0k1l2m3n4o5p",
    title: "Teamwork",
    description:
      "Pioneers new solutions, echoing Tesla's drive for technological advancement.",
    logo: "logos:slack-icon",
    acquired: false,
  },
  {
    id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    title: "Leadership",
    description:
      "Excels in managing time effectively, much like Trello organizes tasks seamlessly.",
    logo: "logos:linkedin-icon",
    acquired: false,
  },
  {
    id: "2a3b4c5d-6e7f-8g9h-0i1j-2k3l4m5n6o7p",
    title: "Data Analysis",
    description:
      "Skilled in online sales strategies, much like Amazon’s mastery of global commerce.",
    logo: "logos:youtube-icon",
    acquired: false,
  },
  {
    id: "3a4b5c6d-7e8f-9g0h-1i2j-3k4l5m6n7o8p",
    title: "Content Creation",
    description:
      "Crafts visually stunning experiences, much like Canva empowers creativity.",
    logo: "logos:netflix-icon",
    acquired: false,
  },
  {
    id: "4a5b6c7d-8e9f-0g1h-2i3j-4k5l6m7n8o9p",
    title: "Content Creation",
    description:
      "Produces engaging content, much like Netflix captivates its audience.",
    logo: "logos:netflix-icon",
    acquired: true,
  },
  {
    id: "5a6b7c8d-9e0f-1g2h-3i4j-5k6l7m8n9o0p",
    title: "Communication",
    description:
      "Masters the art of numbers, similar to Tableau's visual storytelling with data.",
    logo: "skill-icons:instagram",
    acquired: false,
  },
  {
    id: "6a7b8c9d-0e1f-2g3h-4i5j-6k7l8m9n0o1p",
    title: "Coding",
    description:
      "Builds loyal audiences, much like Spotify retains its subscribers with unique experiences.",
    logo: "logos:spotify-icon",
    acquired: false,
  },
];

const mockIntegrations = [
  {
    id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    title: "Coding",
    logo: "logos:spotify-icon",
    provider: "Spotify",
  },
  {
    id: "2a3b4c5d-6e7f-8g9h-0i1j-2k3l4m5n6o7p",
    title: "Data Analysis",
    logo: "logos:youtube-icon",
    provider: "YouTube",
  },
  {
    id: "3a4b5c6d-7e8f-9g0h-1i2j-3k4l5m6n7o8p",
    title: "Communication",
    logo: "skill-icons:instagram",
    provider: "Instagram",
  },
  {
    id: "4a5b6c7d-8e9f-0g1h-2i3j-4k5l6m7n8o9p",
    title: "Problem-Solving",
    logo: "logos:google-icon",
    provider: "Google",
  },
  {
    id: "5a6b7c8d-9e0f-1g2h-3i4j-5k6l7m8n9o0p",
    title: "Teamwork",
    logo: "logos:slack-icon",
    provider: "Slack",
  },
  {
    id: "6a7b8c9d-0e1f-2g3h-4i5j-6k7l8m9n0o1p",
    title: "Marketing",
    logo: "logos:tiktok-icon",
    provider: "Tiktok",
  },
  {
    id: "7a8b9c0d-1e2f-3g4h-5i6j-7k8l9m0n1o2p",
    title: "Leadership",
    logo: "logos:linkedin-icon",
    provider: "LinkedIn",
  },
  {
    id: "8a9b0c1d-2e3f-4g5h-6i7j-8k9l0m1n2o3p",
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
  const [selectedSkill, setSelectedSkill] = useState([]);
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
    setSelectedIntegration([]);
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
    setSelectedSkill([]);
  };

  return (
    <Container>
      <TextField
        sx={{ mb: 3 }}
        fullWidth
        variant="outlined"
        placeholder="Search integrations for team or colleagues"
        value={searchTerm}
        autoComplete="off"
        onChange={handleSearchChange}
      />

      <Grid container spacing={1} sx={{ mb: 2 }}>
        {searchTerm &&
          filteredIntegrations.map((integration) => (
            <Grid key={integration.id} item xs={12} sm={6} md={2}>
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
        {filteredData.map((skill) => (
          <Grid item xs={12} sm={6} md={3} key={skill.id}>
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
