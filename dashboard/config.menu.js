import AIMarketplaceButton from "./src/widgets/AIMarketplace/AIMarketplaceButton.js";
import OrganizationButton from "./src/widgets/OrganizationButton/index.js";

const menuConfig = {
  topMenu: [],
  sideMenu: [
    {
      subheader: "Dashboard",
      items: [
        {
          title: "Dashboard",
          icon: "ic:outline-dashboard",
          path: "/",
        },
        {
          title: "Colleagues",
          icon: "solar:chart-line-duotone",
          path: "/colleagues",
        },
        {
          title: "Chat",
          icon: "ic:baseline-chat",
          path: "/chat",
        },
        {
          title: "Integrations",
          icon: "carbon:ibm-cloud-pak-integration",
          path: "/integrations",
        },
      ],
    },
  ],
  options: [
    {
      label: "Home",
      linkTo: "/",
    },
    {
      label: "Profile",
      linkTo: "/",
    },
    {
      label: "Settings",
      linkTo: "/",
    },
  ],
  actionButtons: [AIMarketplaceButton, OrganizationButton],
  fullScreenLayout: "left",
};

export default menuConfig;
