import { Outlet } from "react-router-dom";
import TeamWizard from "./widgets/TeamWizard/TeamWizard";
import { useEffect } from "react";

import { publish, useEvent } from "@nucleoidai/react-event";

function Container() {
  const [platformDialog] = useEvent("PLATFORM", "PROJECT_DIALOG", {
    open: false,
  });

  useEffect(() => {
    if (platformDialog.open) {
      console.log("Add new team event");
    }
  }, [platformDialog]);

  const handleTeamWizardSubmit = ({ team, organization }) => {
    console.log(team, organization);
  };

  return (
    <>
      <TeamWizard
        open={platformDialog.open}
        onClose={() => {
          publish("PLATFORM", "PROJECT_DIALOG", { open: false });
        }}
        onSubmit={handleTeamWizardSubmit}
      />
      <Outlet />
    </>
  );
}

export default Container;
