import { Outlet } from "react-router-dom";
import TeamWizard from "./widgets/TeamWizard/TeamWizard";
import { useEffect } from "react";
import { useEvent } from "@nucleoidai/react-event";

function Container() {
  const [platformDialog] = useEvent("ADD_PROJECT_BUTTON_CLICKED", false);

  console.log("Container", platformDialog);

  useEffect(() => {
    if (platformDialog) {
      console.log("Add new team event");
    }
  }, [platformDialog]);

  return (
    <>
      <TeamWizard
        open={platformDialog}
        onClose={() => {}}
        title="Team"
        itemProperties={["name", "character", "role"]}
        onSubmit={(team) => console.log(team)}
      />
      <Outlet />
    </>
  );
}

export default Container;
