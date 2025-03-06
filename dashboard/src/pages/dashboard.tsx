import FlowReact from "./FlowReact";
import { Helmet } from "react-helmet-async";
import PerformanceChart from "../widgets/DepartmantCharts/PerformanceChart";
import ReaFlow from "./ReaFlow";
import React from "react";
import TotalIncomes from "../widgets/DepartmantCharts/TotalIncomes";
import { TwoSideLayout } from "@nucleoidai/platform/layouts";
import UsageChart from "../widgets/DepartmantCharts/UsageChart";
import WidgetSummaryWidget from "../widgets/WidgetSummary/WidgetSummary";
import config from "../../config";

function Dashboard() {
  return (
    <>
      <ReaFlow />
      <FlowReact />
    </>
  );
}

export default Dashboard;
