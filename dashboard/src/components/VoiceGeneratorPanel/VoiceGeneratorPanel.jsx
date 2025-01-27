import React from "react";
import styles from "./styles";

import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";

function VoiceGeneratorPanel({
  generateTemporaryVoice,
  createPermanentVoice,
  temporaryVoiceID,
  isLoading,
  canUseVoice,
  isCreatingPermanentVoice,
  gender,
  setGender,
  age,
  setAge,
  accent,
  setAccent,
  accentStrength,
  setAccentStrength,
  text,
  setText,
  sampleVoice,
  isSamplingVoice,
}) {
  return (
    <Box sx={styles.box}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography style={styles.gender}>Gender</Typography>
        <Select
          fullWidth
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <MenuItem value={"male"}>Male</MenuItem>
          <MenuItem value={"female"}>Female</MenuItem>
        </Select>

        <Typography style={styles.age}>Age</Typography>
        <Select fullWidth value={age} onChange={(e) => setAge(e.target.value)}>
          <MenuItem value={"young"}>Young</MenuItem>
          <MenuItem value={"middle_aged"}>Middle_Aged</MenuItem>
          <MenuItem value={"old"}>Old</MenuItem>
        </Select>

        <Typography style={styles.accent}>Accent</Typography>
        <Select
          fullWidth
          value={accent}
          onChange={(e) => setAccent(e.target.value)}
        >
          <MenuItem value={"american"}>American</MenuItem>
          <MenuItem value={"british"}>British</MenuItem>
          <MenuItem value={"african"}>African</MenuItem>
          <MenuItem value={"australian"}>Australian</MenuItem>
          <MenuItem value={"indian"}>Indian</MenuItem>
        </Select>

        <Typography style={styles.strength}>Accent Strength</Typography>
        <Slider
          value={accentStrength}
          onChange={(e, val) => setAccentStrength(val)}
          min={30}
          max={200}
        />

        <TextField
          fullWidth
          multiline
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined"
        />
      </Box>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Button
            fullWidth
            onClick={generateTemporaryVoice}
            color="secondary"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        </Grid>
        <Grid item>
          <Button
            fullWidth
            onClick={() => {
              createPermanentVoice(temporaryVoiceID);
            }}
            variant="contained"
            disabled={!canUseVoice}
          >
            {isCreatingPermanentVoice ? "Creating..." : "Use Voice"}
          </Button>
        </Grid>
        <Grid item>
          <Button
            fullWidth
            onClick={() => {
              sampleVoice();
            }}
            variant="contained"
            color="secondary"
            disabled={isSamplingVoice}
          >
            {isSamplingVoice ? "Sampling..." : "Sample voice"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default VoiceGeneratorPanel;
