import LandingDialog from "./LandingDialog";
import { storage } from "@nucleoidjs/webstorage";

import React, { useEffect, useState } from "react";

const Onboarding = () => {
  const landingLevel = storage.get("landingLevel");

  const [landing, setLanding] = useState(landingLevel);

  useEffect(() => {
    if (landingLevel !== null) {
      storage.get("landingLevel");
    } else if (landingLevel === null) {
      storage.set("landingLevel", 0);
    }
  }, []);

  const handleClose = () => {
    storage.set("landingLevel", 1);
    setLanding(1);
  };

  console.log("Landing", landing);

  switch (landing) {
    case 0:
      return <LandingDialog handleClose={handleClose} />;
  }

  return;
};

export default Onboarding;
