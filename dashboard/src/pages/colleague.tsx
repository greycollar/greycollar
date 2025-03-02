import ColleagueLayout from "../layouts/ColleagueLayout";
import Page from "../components/Page/Page";
import React from "react";
import useColleague from "../hooks/useColleague";
import { useParams } from "react-router-dom";
function Colleague() {
  const { colleagueId } = useParams();
  const { colleague, loading } = useColleague(colleagueId);

  return (
    <>
      <Page name={"Colleague"} links={""} children={""} />
      <ColleagueLayout colleague={colleague} loading={loading} />
    </>
  );
}
export default Colleague;
