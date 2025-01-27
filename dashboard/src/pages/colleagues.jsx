import ColleaguesWidget from "../widgets/ColleaguesWidget/ColleaguesWidget";
import { Helmet } from "react-helmet-async";
import SingleScorllableLayout from "../layouts/SingleScrollableLayout";
import config from "../../config";
import { storage } from "@nucleoidjs/webstorage";
import { useEvent } from "@nucleoidai/react-event";
import { useParams } from "react-router-dom";
import useTeam from "../hooks/useTeam";

import React, { useEffect } from "react";

function Colleagues() {
  const { team, loading } = useTeam();
  const { colleagueId } = useParams();
  const teamId = storage.get("itemId");
  const [teamSelected] = useEvent("ITEM_SELECTED", { itemId: teamId });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamSelected]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title> {config.name} - Colleagues </title>
      </Helmet>
      <SingleScorllableLayout title={team.name}>
        <ColleaguesWidget colleagueId={colleagueId} teamId={teamId} />
      </SingleScorllableLayout>
    </>
  );
}
export default Colleagues;
