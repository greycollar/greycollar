import LandingDialog from "./LandingDialog";
import { storage } from "@nucleoidjs/webstorage";
import { useEvent } from "@nucleoidai/react-event";

import React, { useEffect, useState } from "react";

const Onboarding = () => {
  const landingLevel = storage.get("landingLevel");
  const [teamSelected] = useEvent("PROJECT_SELECTED", { projectId: null });

  const [landing, setLanding] = useState(landingLevel);

  useEffect(() => {
    if (landingLevel === null && teamSelected.projectId !== null) {
      storage.set("landingLevel", 0);
      setLanding(0);
    }
  }, [teamSelected]);

  const handleClose = () => {
    storage.set("landingLevel", 1);
    setLanding(1);
  };

  switch (landing) {
    case 0:
      return <LandingDialog />;
  }

  return;
};

export default Onboarding;
