import Onboarding from "./components/Onboarding/Onboarding";
import { Outlet } from "react-router-dom";
import TeamWizard from "./widgets/TeamWizard/TeamWizard";

import { publish, useEvent } from "@nucleoidai/react-event";

function Container() {
  const [platformDialog] = useEvent("PLATFORM", "PROJECT_BAR_DIALOG", {
    open: false,
  });

  return (
    <>
      <TeamWizard
        open={platformDialog.open}
        onClose={() => {
          publish("PLATFORM", "PROJECT_BAR_DIALOG", { open: false });
        }}
      />

      <Onboarding />
      <Outlet />
    </>
  );
}

export default Container;
