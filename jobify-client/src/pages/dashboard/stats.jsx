import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { displayAlert, setLoading } from "../../store/commonReducer";
import JobService from "../../services/job";
import { ChartContainer, Loading, StatsContainer } from "../../components";

const defaultStats = { pending: 0, interview: 0, declined: 0 };

const StatsPage = () => {
  const [stats, setStats] = useState(defaultStats);
  const [monthlyApplications, setMonthlyApplications] = useState([]);
  const token = useSelector((state) => state.user.token);
  const isLoading = useSelector((state) => state.common.isloading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchStats = async () => {
      try {
        const res = await JobService.showStats(token);
        const { stats: resStats, monthlyApplications: resMonthlyApplications } =
          res.data;
        setStats({ stats, ...resStats });
        setMonthlyApplications(resMonthlyApplications);
      } catch (error) {
        dispatch(
          displayAlert({
            alertType: "danger",
            alertText: error.response.data.msg,
          })
        );
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchStats();
  }, []);

  return isLoading ? (
    <Loading center />
  ) : (
    <>
      <StatsContainer stats={stats} />
      {monthlyApplications.length > 0 && (
        <ChartContainer data={monthlyApplications} />
      )}
    </>
  );
};

export default StatsPage;
