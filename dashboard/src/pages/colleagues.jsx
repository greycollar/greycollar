import ColleaguesWidget from "../widgets/ColleaguesWidget/ColleaguesWidget";
import Page from "../components/Page/Page";
import SingleScorllableLayout from "../layouts/SingleScrollableLayout";
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
      <Page
        name={"Colleague"}
        links={[
          { name: "Dashboard", href: "/" },
          { name: "Colleagues", href: "/colleagues" },
        ]}
      />
      <SingleScorllableLayout title={team.name}>
        <ColleaguesWidget colleagueId={colleagueId} teamId={teamId} />
      </SingleScorllableLayout>
    </>
  );
}
export default Colleagues;
