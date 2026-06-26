import React from "react";
import { Tabs } from "antd";
import Users from "./Users";
import Teams from "./Teams";

export default function Settings() {
  const items = [
    {
      key: "1",
      label: "Users",
      children: <Users />,
    },
    {
      key: "2",
      label: "Teams",
      children: <Teams />,
    },
  ];

  return (
    <div style={{ padding: "16px" }}>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}
