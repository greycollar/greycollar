import Onboarding from "./components/Onboarding/Onboarding";
import { Outlet } from "react-router-dom";
import TeamWizard from "./widgets/TeamWizard/TeamWizard";
import { useEffect } from "react";
import useOrganization from "./hooks/useOrganization";
import useTeams from "./hooks/useTeams";

import { publish, useEvent } from "@nucleoidai/react-event";

function Container() {
  const { createTeam } = useTeams();
  const { createOrganization } = useOrganization();
  const [platformDialog] = useEvent("PLATFORM", "PROJECT_BAR_DIALOG", {
    open: false,
  });

  useEffect(() => {
    if (platformDialog.open) {
      console.log("Add new team event");
    }
  }, [platformDialog]);

  const handleTeamWizardSubmit = async ({ team, organization }) => {
    try {
      if (organization.id) {
        await createTeam(team, organization.id);
      } else {
        const result = await createOrganization(organization);
        await createTeam(team, result.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TeamWizard
        open={platformDialog.open}
        onClose={() => {
          publish("PLATFORM", "PROJECT_BAR_DIALOG", { open: false });
        }}
        onSubmit={handleTeamWizardSubmit}
      />
      <Onboarding />
      <Outlet />
    </>
  );
}

export default Container;
