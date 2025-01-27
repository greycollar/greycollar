import Card from "@mui/material/Card";
import ProfileCover from "../ProfileCover/ProfileCover";
import TabBar from "../Tabs/Tabs";
import useKnowledges from "../../hooks/useKnowledges";

function ProfileCard({
  name,
  avatarUrl,
  coverUrl,
  role,
  currentTab,
  setCurrentTab,
  TABS,
}) {
  const { loading } = useKnowledges();

  return (
    <Card variant="profile-card" sx={{ position: "relative" }}>
      <ProfileCover
        loading={loading}
        role={role}
        name={name}
        avatarUrl={avatarUrl}
        coverUrl={coverUrl}
      />

      <TabBar
        TABS={TABS}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
    </Card>
  );
}

export default ProfileCard;
