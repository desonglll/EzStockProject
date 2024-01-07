import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ListPage from "./ListPage";
import Menu from "./Menu";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function MainPage() {
  return (
    <React.Fragment>
      <Menu />
    </React.Fragment>
  );
}

export default MainPage;
