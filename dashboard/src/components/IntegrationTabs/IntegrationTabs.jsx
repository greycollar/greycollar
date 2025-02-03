import React from "react";

import { Box, Tab, Tabs } from "@mui/material";

const IntegrationTabs = ({ selectedTab, handleTabChange, tabs }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "primary.main",
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            label={tab.title}
            sx={{
              "&.Mui-selected": {
                color: "primary.main",
              },
              "&:hover": {
                color: "primary.main",
                opacity: 0.7,
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default IntegrationTabs;
