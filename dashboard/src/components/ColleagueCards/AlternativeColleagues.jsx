import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CustomAvatar from "../CustomAvatar/CustomAvatar";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // ----------------------------------------------------------------------
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";

export default function AlternativeColleagues({ candidates }) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        md: "repeat(3, 1fr)",
      }}
    >
      {candidates.map((candidate) => (
        <Stack
          component={Card}
          direction="row"
          spacing={2}
          key={candidate.id}
          sx={{ p: 3 }}
        >
          <IconButton sx={{ position: "absolute", top: 8, right: 8 }}>
            <MoreVertIcon />
          </IconButton>

          <CustomAvatar
            source={candidate.avatar}
            sx={{ width: 48, height: 48 }}
          />

          <Stack spacing={2}>
            <ListItemText
              primary={candidate.name}
              secondaryTypographyProps={{
                mt: 0.5,
                component: "span",
                typography: "caption",
                color: "text.disabled",
              }}
            />

            <Stack spacing={1} direction="row">
              <TextField
                label="Responsibility"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                multiline
                value={candidate.responsibility}
              />
              <TextField
                label="Personality"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                multiline
                value={candidate.personality}
              />
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Box>
  );
}
