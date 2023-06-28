import React from "react";

import Wrapper from "../assets/wrappers/StatsContainer";
import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import StatItem from "./stat-item";

const StatsContainer = ({ stats }) => {
  const statsConfig = [
    {
      title: "Pending Applications",
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bg: "#fcefc7",
    },
    {
      title: "Interviews Scheduled",
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bg: "#e0e8f9",
    },
    {
      title: "Jobs Declined",
      count: stats.declined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bg: "#ffeeee",
    },
  ];
  return (
    <Wrapper>
      {statsConfig.map((item, index) => (
        <StatItem
          key={index}
          count={item.count}
          title={item.title}
          icon={item.icon}
          color={item.color}
          bgColor={item.bg}
        />
      ))}
    </Wrapper>
  );
};

export default StatsContainer;
