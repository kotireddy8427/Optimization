import React, { useState, useEffect } from "react";
import { getPerformanceMetrics } from "../api/claimsApi";

export default function MonitoringDashboard() {
  const [metrics, setMetrics] = useState({ requestCount: 0, avgResponseTime: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(getPerformanceMetrics());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "20px auto", padding: 10, border: "1px solid #ccc" }}>
      <h2>Performance Metrics</h2>
      <p>Requests made: {metrics.requestCount}</p>
      <p>Average response time: {metrics.avgResponseTime} ms</p>
    </div>
  );
}
