import { Iconify } from "@nucleoidai/platform/minimal/components";
import Knowledge from "../widgets/Knowledge/Knowledge";
import PopupChatWidget from "../widgets/PopupChatWidget";
import Profile from "../widgets/Profile/Profile";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import React from "react";
import Stack from "@mui/material/Stack";
import Supervising from "../widgets/Supervising/Supervising";
import Tasks from "../widgets/Tasks/Tasks";
import { getBackgroundUrl } from "../utils/background";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";

const TABS = [
  {
    value: "profile",
    label: "Profile",
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: "knowledge-base",
    label: "Knowledge Base",
    icon: <Iconify icon="solar:heart-bold" width={24} />,
  },
  {
    value: "supervising",
    label: "Supervising",
    icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
  },
  {
    value: "task",
    label: "Task",
    icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
  },
];

function ColleagueLayout({ colleague }) {
  const [currentTab, setCurrentTab] = useState("profile");
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <>
      <Stack margin={2} sx={{ position: "relative" }}>
        <ProfileCard
          TABS={TABS}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          name={colleague.name}
          avatarUrl={colleague.avatar}
          coverUrl={getBackgroundUrl(colleague.id)}
          role={colleague.role}
        />
        <Stack
          sx={{
            position: "absolute",
            bottom: mdDown ? "auto" : 20,
            left: mdDown ? "auto" : 120,
            top: mdDown ? 25 : "auto",
            right: mdDown ? 25 : "auto",
            zIndex: 1000,
          }}
        >
          <PopupChatWidget />
        </Stack>
      </Stack>
      {currentTab === "profile" && <Profile colleagueId={colleague.id} />}
      {currentTab === "knowledge-base" && (
        <Knowledge colleagueId={colleague.id} />
      )}
      {currentTab === "supervising" && (
        <Supervising colleagueId={colleague.id} />
      )}
      {currentTab === "task" && <Tasks colleagueId={colleague.id} />}
    </>
  );
}

export default ColleagueLayout;
