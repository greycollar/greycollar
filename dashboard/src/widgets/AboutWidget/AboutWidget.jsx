import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

export default function AboutWidget({ colleague }) {
  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" spacing={2}>
          <Box sx={{ typography: "body2" }}>
            {"Responsibility:"}
            <Typography variant="subtitle2" color="inherit">
              {colleague?.responsibility}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
}
