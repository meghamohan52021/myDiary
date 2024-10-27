import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function MoodChart({ entries }) {
  
  const dates = entries.map((entry) => entry.date);
  const scores = entries.map((entry) => entry.sentiment);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Mood Score Over Time",
        data: scores,
        fill: false,
        backgroundColor: "#ebb4c5",
        borderColor: "#494949",
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: -100,
        max: 100,
        title: {
          display: true,
          text: "Sentiment Score",
        },
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "40px auto" }}>
      <h2 style={{ textAlign: "center", color: "#494949" }}>Mood Trends</h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default MoodChart;
