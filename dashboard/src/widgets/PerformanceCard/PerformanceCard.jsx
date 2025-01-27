import "chart.js/auto"; //eslint-disable-line

import PerformanceSkeleton from "../../components/Skeletons/PerformanceSkeleton";
import TitleBar from "../../components/TitleBar/TitleBar";
import styles from "./styles";
import useGraphState from "../../hooks/useGraphState";

import { Box, Card, Container, Tab, Tabs } from "@mui/material";
import { Line, Pie } from "react-chartjs-2";
import React, { useCallback, useEffect, useState } from "react";

function PerformanceCard({ colleagueId }) {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);

  const { graphState, fetchPieGraph, fetchLineGraph } = useGraphState();

  const fetchGraphData = useCallback(async () => {
    await fetchPieGraph(colleagueId);
    await fetchLineGraph(colleagueId);
    setLoading(false);
  }, [fetchPieGraph, fetchLineGraph, colleagueId]);

  useEffect(() => {
    fetchGraphData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const usageLabels = Object.keys(graphState.pieGraph).slice(1);
  const usageData = Object.values(graphState.pieGraph).slice(1);
  const answerData = graphState.lineGraph?.[2023];
  const pastAnswersData = graphState.lineGraph?.[2022];

  const serviceUsageData = {
    labels: usageLabels,
    datasets: [
      {
        label: "Service Usages",
        data: usageData,
        backgroundColor: styles.graphColor,
        hoverOffset: 4,
      },
    ],
  };

  const correctAnswerData = {
    datasets: [
      {
        label: "Correct Answers in 2023",
        data: answerData,
      },
      {
        label: "Correct Answers in 2022",
        data: pastAnswersData,
      },
    ],
  };

  return (
    <Container sx={{ p: 2 }}>
      {loading ? (
        <PerformanceSkeleton />
      ) : (
        <Card elevation={6} sx={styles.card}>
          <TitleBar title={"Performance"} />
          <Box sx={{ width: "100%", pt: "48px" }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Service Usage" />
              <Tab label="Correct Answers" />
            </Tabs>
            <Box sx={styles.graphBox}>
              {value === 0 && (
                <Box sx={styles.graph}>
                  <Pie data={serviceUsageData}></Pie>
                </Box>
              )}
              {value === 1 && (
                <Box sx={styles.graph}>
                  <Line data={correctAnswerData}></Line>
                </Box>
              )}
            </Box>
          </Box>
        </Card>
      )}
    </Container>
  );
}

export default PerformanceCard;
