import Box from "@mui/material/Box";
import StatusToolbar from "../../components/StatusToolbar/StatusToolbar";
import SupervisingCard from "../../components/SupervisingCard/SupervisingCard";
import useSupervisings from "../../hooks/useSupervisings";

import { Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

const Supervising = ({ colleagueId }) => {
  const { updateSupervising, supervisings, getColleagueSupervisingByStatus } =
    useSupervisings(colleagueId);

  const [selectedStatus, setSelectedStatus] = useState("IN_PROGRESS");

  useEffect(() => {
    getColleagueSupervisingByStatus(colleagueId, selectedStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus]);

  const handleChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <StatusToolbar
          statuses={["All", "ANSWERED", "IN_PROGRESS"]}
          handleChange={handleChange}
          selectedStatus={selectedStatus}
        />
        {supervisings.length > 0 ? (
          <SupervisingCard
            updateSupervising={updateSupervising}
            supervisings={supervisings}
          />
        ) : (
          <Stack sx={{ textAlign: "center", my: 4, color: "text.secondary" }}>
            No supervising data available for the selected status
          </Stack>
        )}
      </Box>
    </Container>
  );
};

export default Supervising;
