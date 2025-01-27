import DialogContentText from "@mui/material/DialogContentText";
import Grid from "@mui/material/Grid";
import SourcedAvatar from "../SourcedAvatar/SourcedAvatar";

import { Card, CardContent, CardHeader, Typography } from "@mui/material";

export default function ItemSummary({ newItem }) {
  return (
    <>
      <DialogContentText sx={{ textAlign: "center", mb: 2 }}>
        Colleague Summary
      </DialogContentText>
      <Grid container spacing={2}>
        <Grid
          item
          xs={4}
          sx={{
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
          }}
        >
          <Card
            sx={{
              bgcolor: (theme) => theme.palette.background.paper,
              boxShadow: (theme) => theme.customShadows.card,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <CardContent
              children={
                <>
                  <Typography
                    variant="h6"
                    textAlign={"center"}
                    mb={2}
                    data-cy="item-summary-name-area"
                  >
                    {newItem.name}
                  </Typography>
                  <SourcedAvatar
                    source={
                      newItem.src ||
                      `https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_${newItem?.avatar?.replace(
                        /:/g,
                        ""
                      )}.jpg`
                    }
                    sx={{
                      display: "flex",
                      alignSelf: "center",
                      justifySelf: "center",
                      width: { xs: 40, md: 104 },
                      height: { xs: 40, md: 104 },
                      border: `solid 2px ${(theme) =>
                        theme.palette.common.white}`,
                    }}
                  />
                </>
              }
            />
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card>
            <CardHeader title="Character" />
            <CardContent>
              <Typography data-cy="item-summary-character-area">
                {newItem.character}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardHeader title="Engine" />
            <CardContent>
              <Typography data-cy="item-summary-role-area">
                {newItem.engineName}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card>
            <CardHeader title="Role" />
            <CardContent>
              <Typography data-cy="item-summary-role-area">
                {newItem.role}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
