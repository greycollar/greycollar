import { Grid } from "@mui/material";
import React from "react";
import Skills from "../Skills/Skills";

const Integrations = ({
  key,
  title,
  description,
  logo,
  onSkillClick,
  acquired,
}) => {
  return (
    <Grid item xs={12} sm={6} md={3} key={key}>
      <Skills
        title={title}
        description={description}
        logo={logo}
        onSkillClick={onSkillClick}
        acquired={acquired}
      />
    </Grid>
  );
};

export default Integrations;
