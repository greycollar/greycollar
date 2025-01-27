import ColleagueLayout from "../layouts/ColleagueLayout";
import React from "react";
import useColleague from "../hooks/useColleague";
import { useParams } from "react-router-dom";

function Colleague() {
  const { colleagueId } = useParams();
  const { colleague } = useColleague(colleagueId);

  return (
    <>
      <ColleagueLayout colleague={colleague} />
    </>
  );
}
export default Colleague;
