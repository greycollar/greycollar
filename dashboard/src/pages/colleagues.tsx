import ColleaguesWidget from "../widgets/ColleaguesWidget/ColleaguesWidget";
import Page from "../components/Page/Page";
import SingleScorllableLayout from "../layouts/SingleScrollableLayout";
import { storage } from "@nucleoidjs/webstorage";
import  { useEffect } from "react";
import { useEvent } from "@nucleoidai/react-event";
import { useParams } from "react-router-dom";
import useTeam from "../hooks/useTeam";

function Colleagues() {
  const teamId = storage.get("itemId");

  const { team, loading } = useTeam(teamId);
  const { colleagueId } = useParams();

  const [teamSelected] = useEvent("ITEM_SELECTED", { itemId: teamId });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamSelected]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Page name={"Colleague"} />
      <SingleScorllableLayout title={team.name}>
        <ColleaguesWidget colleagueId={colleagueId} teamId={teamId} />
      </SingleScorllableLayout>
    </>
  );
}
export default Colleagues;
