import ColleagueLayout from "../layouts/ColleagueLayout";
import Page from "../components/Page/Page";
import React from "react";
import useColleague from "../hooks/useColleague";
import { useParams } from "react-router-dom";
function Colleague() {
  const { colleagueId } = useParams();
  const { colleague } = useColleague(colleagueId);

  return (
    <>
      <Page name={"Colleague"} />
      <ColleagueLayout colleague={colleague} />
    </>
  );
}
export default Colleague;
