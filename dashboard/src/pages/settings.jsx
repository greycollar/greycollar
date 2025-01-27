import FullScreenLayout from "../layouts/FullScreenLayout";
import { Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import React from "react";
import SettingsMenuWidget from "../widgets/SettingsMenuWidget";
import TeamPermissionWidget from "../widgets/TeamPermissionWidget";
import config from "../../config";
import { storage } from "@nucleoidjs/webstorage";

export default function Settings() {
  const teamId = storage.get("itemId");
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title> {config.name} - Settings </title>
      </Helmet>
      <FullScreenLayout>
        <Grid container sx={{ alignSelf: "center", justifySelf: "center" }}>
          <Grid item xs={4}>
            <SettingsMenuWidget />
          </Grid>
          <Grid item xs={8}>
            <TeamPermissionWidget teamId={teamId} />
          </Grid>
        </Grid>
      </FullScreenLayout>
    </>
  );
}
