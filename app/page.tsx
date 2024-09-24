"use client";

import React, { useEffect, useState } from "react";
import Header from "./components/header";
import { Line, Doughnut } from "react-chartjs-2";
import axios from "axios";
import {
  ArcElement,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartTooltip,
  ChartLegend
);

const HomePage = () => {
  const [investment, setInvestment] = useState(0);
  const [profit, setProfit] = useState(0);
  const [totalSale, setTotalSale] = useState(0);
  const [roi, setRoi] = useState(0.0);
  const [timeRange, setTimeRange] = useState("3 months");
  const [chartData, setChartData] = useState<{
    labels: string[];
    videoViews: number[];
    totalOrders: number[];
    conversion: number[];
    views: number;
    clicks: number;
  } | null>(null);
  const [views, setViews] = useState(0);
  const [clicks, setClicks] = useState(0);

  const filterOptions = ["1 week", "3 months", "6 months"];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const timeParam = {
          "1 week": 1,
          "3 months": 2,
          "6 months": 3,
        }[timeRange];

        const response = await axios.get(`/api/dashboard?time=${timeParam}`);

        setInvestment(response.data.dashboard.investment);
        setProfit(response.data.dashboard.profit);
        setTotalSale(response.data.dashboard.totalSales);
        setRoi(response.data.dashboard.roi);
        setClicks(response.data.chart.clicks);
        setViews(response.data.chart.views);
        setChartData(response.data.chart);
      } catch (error) {
        console.error("Error fetching investment data:", error);
      }
    };

    fetchDashboardData();
  }, [timeRange]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const donutData = {
    labels: ["Clicks", "Views"],
    datasets: [
      {
        data: [clicks, views],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const donutOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        position: "right" as const, // Explicitly type the position
        labels: {
          boxWidth: 20, // Adjust the box width
          padding: 20, // Adjust the padding between labels
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            label += formatNumber(context.raw);
            return label;
          },
        },
      },
    },
  };

  const investmentProfitData = {
    labels: ["Investment", "Profit"],
    datasets: [
      {
        data: [investment, profit],
        backgroundColor: ["#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const investmentProfitOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          boxWidth: 20,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            label += formatNumber(context.raw);
            return label;
          },
        },
      },
    },
  };

  const lineOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-gradient-to-b from-white via-pink-50 to-pink-100 min-h-screen max-w-s">
      <Header
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        filterOptions={filterOptions}
      />
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
        {/* Left Column: Video Sales and Engagement Rate (Narrower) */}
        <div className="md:col-span-2 flex flex-col space-y-6">
          {/* Video Sales Card */}
          <div
            className="bg-black text-white p-6 rounded-lg shadow-md flex items-center justify-between transition transform hover:scale-105 pb-20"
            style={{ height: "500px", width: "100%" }}
          >
            <div className="w-full">
              <div className="flex justify-center items-center w-full max-w-xs">
                <Doughnut
                  data={investmentProfitData}
                  options={investmentProfitOptions}
                />
              </div>
              <h3 className="text-lg font-bold mb-2">Video Sales</h3>
              <p className="text-3xl font-bold">${formatNumber(totalSale)}</p>
              <p className="text-sm text-gray-400">{roi}X ROI</p>
              <div className="flex flex-col w-full mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold mb-2">Onsite Sales</h3>
                  <p className="text-sm text-gray-400 pr-5 text-right">
                    ${totalSale}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <h6 className="text-lg text-gray-400 mb-2">Profit</h6>
                  <p className="text-sm text-gray-400 pr-5 text-right">
                    ${profit}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <h6 className="text-lg text-gray-400 mb-2">Investment</h6>
                  <p className="text-sm text-gray-400 pr-5 text-right">
                    ${investment}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Engagement Rate Card */}
          <div className="bg-black text-white p-6 rounded-lg shadow-md flex items-center justify-between transition transform hover:scale-105">
            <div>
              <h3 className="text-lg font-bold mb-2">Engagement Rate</h3>
              <p className="text-3xl font-bold">
                {formatNumber(clicks)} clicks
              </p>
              <p className="text-sm text-gray-400">
                {formatNumber(views)} views
              </p>
            </div>
            <div className="w-1/3">
              <Doughnut data={donutData} options={donutOptions} />
            </div>
          </div>
        </div>

        {/* Right Column: Charts (Wider) */}
        <div className="md:col-span-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Video Views Line Chart */}
          <div
            className="col-span-2 md:col-span-1 bg-white p-4 rounded-lg shadow-md pb-20"
            style={{ height: "400px", width: "100%" }}
          >
            <h3 className="text-lg font-bold mb-4 text-black">Video Views</h3>
            <Line
              data={{
                labels: chartData.labels,
                datasets: [
                  {
                    label: "Video Views",
                    data: chartData.videoViews,
                    borderColor: "rgb(75, 192, 192)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    tension: 0.4,
                    animation: {
                      duration: 1000,
                      easing: "easeInOutQuad",
                    },
                  },
                ],
              }}
              options={lineOptions}
            />
          </div>

          {/* Total Video Orders Line Chart */}
          <div
            className="col-span-2 md:col-span-1 bg-white p-4 rounded-lg shadow-md pb-20"
            style={{ height: "400px", width: "100%" }}
          >
            <h3 className="text-lg font-bold mb-4 text-black">
              Total Video Orders
            </h3>
            <Line
              data={{
                labels: chartData.labels,
                datasets: [
                  {
                    label: "Total Orders",
                    data: chartData.totalOrders,
                    borderColor: "rgb(54, 162, 235)",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    tension: 0.4,
                    animation: {
                      duration: 1000,
                      easing: "easeInOutQuad",
                    },
                  },
                ],
              }}
              options={lineOptions}
            />
          </div>
          <div
            className="col-span-2 bg-white p-6 rounded-lg shadow-md pb-20"
            style={{ height: "300px", width: "100%" }}
          >
            <h3 className="text-lg font-bold mb-4 text-black">
              Video Conversion (%)
            </h3>
            <Line
              data={{
                labels: chartData.labels,
                datasets: [
                  {
                    label: "Conversion Percentage",
                    data: chartData.conversion,
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    tension: 0.4,
                    animation: {
                      duration: 1000,
                      easing: "easeInOutQuad",
                    },
                  },
                ],
              }}
              options={lineOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
