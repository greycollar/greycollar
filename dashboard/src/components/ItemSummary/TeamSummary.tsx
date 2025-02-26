import DialogContentText from "@mui/material/DialogContentText";
import Grid from "@mui/material/Grid";
import SourcedAvatar from "../SourcedAvatar/SourcedAvatar";

import { Card, CardContent, Typography } from "@mui/material";

function Summary({ organization, team, colleague }) {
  return (
    <>
      {organization && (
        <>
          <DialogContentText sx={{ textAlign: "center", mb: 2 }}>
            Organization
          </DialogContentText>
          <Card
            sx={{
              bgcolor: (theme) => theme.palette.background.paper,
              boxShadow: (theme) => theme.customShadows.card,
              mb: 3,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                textAlign="center"
                data-cy="org-summary-name-area"
              >
                {organization.name}
              </Typography>
            </CardContent>
          </Card>
        </>
      )}
      <DialogContentText sx={{ textAlign: "center", mb: 2 }}>
        Team
      </DialogContentText>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
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
              width: "100%",
            }}
          >
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={4}>
                  <SourcedAvatar
                    source={
                      team.src ||
                      `https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_${team?.avatar?.replace(
                        /:/g,
                        ""
                      )}.jpg`
                    }
                    sx={{
                      display: "block",
                      margin: "0 auto",
                      width: { xs: 40, md: 104 },
                      height: { xs: 40, md: 104 },
                      border: `solid 2px ${(theme) =>
                        theme.palette.common.white}`,
                    }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h6" data-cy="item-summary-name-area">
                    {team.name}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {colleague && (
        <>
          <DialogContentText sx={{ textAlign: "center", mb: 2, mt: 3 }}>
            Colleague
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
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
                  width: "100%",
                }}
              >
                <CardContent>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={4}>
                      <SourcedAvatar
                        source={`https://cdn.nucleoid.com/greycollar/avatars/${colleague?.avatar?.replace(
                          /:/g,
                          ""
                        )}.jpg`}
                        sx={{
                          display: "block",
                          margin: "0 auto",
                          width: { xs: 40, md: 104 },
                          height: { xs: 40, md: 104 },
                          border: `solid 2px ${(theme) =>
                            theme.palette.common.white}`,
                        }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography
                        variant="h6"
                        data-cy="colleague-summary-name-area"
                      >
                        {colleague.name}
                      </Typography>
                      <>
                        <Typography variant="body2" color="text.secondary">
                          Role: {colleague.role}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Engine: {colleague.engineName}
                        </Typography>
                      </>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
export { Summary };
