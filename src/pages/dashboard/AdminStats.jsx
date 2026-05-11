import React, { useEffect, useState } from "react";
import { Card, Spin, message } from "antd";
import { Line, Bar, Pie } from "@ant-design/charts";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4433/api';

const AdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/admin/stats`, { credentials: 'include' });
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
        } else {
          message.error("Failed to fetch stats");
        }
      } catch {
        message.error("Error fetching stats");
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  const userGrowthConfig = {
    data: stats?.userGrowth || [],
    xField: "date",
    yField: "count",
    color: "#1890ff",
    point: { size: 4, shape: "circle" },
    smooth: true,
    height: 250,
    autoFit: true,
  };

  const dauConfig = {
    data: stats?.dau || [],
    xField: "date",
    yField: "activeUsers",
    color: "#52c41a",
    height: 250,
    autoFit: true,
  };

  const mauConfig = {
    data: stats?.mau || [],
    xField: "month",
    yField: "activeUsers",
    color: "#faad14",
    height: 250,
    autoFit: true,
  };

  const llmCallsConfig = {
    data: stats?.llmCalls || [],
    xField: "date",
    yField: "calls",
    color: "#722ed1",
    height: 250,
    autoFit: true,
  };

  const billingConfig = {
    data: stats?.billings || [],
    angleField: "amount",
    colorField: "type",
    radius: 0.8,
    label: { type: "outer", content: "{name}: {percentage}" },
    height: 250,
    autoFit: true,
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Stats</h1>
      <Spin spinning={loading}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          <Card title="User Growth" style={{ flex: 1, minWidth: 350 }}>
            <Line {...userGrowthConfig} />
          </Card>
          <Card title="Daily Active Users" style={{ flex: 1, minWidth: 350 }}>
            <Bar {...dauConfig} />
          </Card>
          <Card title="Monthly Active Users" style={{ flex: 1, minWidth: 350 }}>
            <Bar {...mauConfig} />
          </Card>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginTop: 24 }}>
          <Card title="LLM Calls Per Day" style={{ flex: 1, minWidth: 350 }}>
            <Line {...llmCallsConfig} />
          </Card>
          <Card title="Billings" style={{ flex: 1, minWidth: 350 }}>
            <Pie {...billingConfig} />
          </Card>
        </div>
      </Spin>
    </div>
  );
};

export default AdminStats;