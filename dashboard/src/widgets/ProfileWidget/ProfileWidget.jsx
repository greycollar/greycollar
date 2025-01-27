import AboutWidget from "../AboutWidget/AboutWidget";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ItemCard from "../../components/ItemCard";
import PopupChatWidget from "../PopupChatWidget/PopupChatWidget";
import Profile from "../../components/Profile";
import { Stack } from "@mui/material";
import StaticsWidget from "../StaticsWidget/StaticsWidget";
import { TwoSideLayout } from "@nucleoidai/platform/layouts";
import WidgetSummaryWidget from "../WidgetSummary/WidgetSummary";
import useColleagueState from "../../hooks/useColleagueState";

import React, { useCallback, useEffect } from "react";

const ProfileWidget = ({ colleagueId, depertmantId }) => {
  const { colleagueState, getColleagueById } = useColleagueState();

  const fetchColleague = useCallback(async () => {
    await getColleagueById(colleagueId);
  }, [getColleagueById, colleagueId]);

  useEffect(() => {
    fetchColleague();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const TABS = [
    {
      value: "profile",
      label: "Profile",
      icon: <AccountBoxIcon />,
      render: (
        <TwoSideLayout
          rows={{
            firstRow: [
              <WidgetSummaryWidget
                title={"Chat Usage"}
                chartType={"bar"}
                per={2.6}
                key={1}
              />,
              <WidgetSummaryWidget
                key={2}
                per={0.9}
                title={"Customer Satisfaction"}
                chartType={"bar"}
              />,
              <WidgetSummaryWidget
                title={"Learning Knowledge"}
                per={0.6}
                key={3}
              />,
            ],
            secondRow: [
              <ItemCard key={4} item={colleagueState?.colleagueToEdit} />,
              <AboutWidget
                key={5}
                colleague={colleagueState?.colleagueToEdit}
              />,
            ],
          }}
        />
      ),
    },
    {
      value: "statics",
      label: "Statics",
      icon: <InsertChartIcon />,
      render: <StaticsWidget />,
    },
  ];
  return (
    <Stack>
      <Stack
        direction={"row"}
        spacing={2}
        position={"absolute"}
        sx={{ top: 310 }}
      >
        <PopupChatWidget colleagueId={colleagueId} teamId={depertmantId} />
      </Stack>
      {colleagueState.colleagueToEdit && (
        <>
          <Profile
            name={colleagueState?.colleagueToEdit?.name}
            avatar={colleagueState?.colleagueToEdit?.name}
            coverUrl={
              "https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30503.jpg?w=1060&t=st=1702502507~exp=1702503107~hmac=477b7460f5f303da494e9d3abd04fa7faed3ab0dc3e0df116f9d735df35dabb3"
            }
            TABS={TABS}
          />
        </>
      )}
    </Stack>
  );
};

export default ProfileWidget;
