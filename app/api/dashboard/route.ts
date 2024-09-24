export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const time = searchParams.get("time");

  const dashboardData1Week = {
    investment: 1000,
    profit: 130000,
    totalSales: 200000,
    get roi() {
      return ((this.totalSales - this.investment) / this.investment).toFixed(2);
    },
  };

  const dashboardData3Months = {
    investment: 50000,
    profit: 630000,
    totalSales: 800000,
    get roi() {
      return ((this.totalSales - this.investment) / this.investment).toFixed(2);
    },
  };

  const dashboardData6Months = {
    investment: 500000,
    profit: 18000000,
    totalSales: 20000000,
    get roi() {
      return ((this.totalSales - this.investment) / this.investment).toFixed(2);
    },
  };

  const data = {
    "1 week": {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      videoViews: [50, 100, 75, 200, 150, 180, 220],
      totalOrders: [10, 15, 7, 20, 18, 16, 22],
      conversion: [8.5, 9.1, 8.9, 10.0, 9.3, 9.5, 10.2],
      views: 200,
      clicks: 150,
    },
    "3 months": {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      videoViews: [1000, 1500, 1250, 1600, 1800, 2000, 1500, 1300, 1700],
      totalOrders: [150, 180, 160, 175, 290, 200, 160, 240, 300],
      conversion: [9.0, 9.1, 9.3, 9.4, 9.5, 9.6, 9.3, 9.2, 9.4],
      views: 5000,
      clicks: 3000,
    },
    "6 months": {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      videoViews: [
        1200, 1800, 1600, 2000, 2200, 2500, 2600, 2400, 2300, 2700, 2800, 2900,
      ],
      totalOrders: [160, 190, 180, 190, 210, 230, 240, 250, 260, 270, 280, 300],
      conversion: [8.9, 9.2, 9.4, 9.5, 9.7, 9.8, 9.6, 9.7, 9.5, 9.8, 9.9, 10.0],
      views: 12000,
      clicks: 8000,
    },
  };

  let dashboardData;
  let chartData;

  switch (time) {
    case "1": // 1 week
      dashboardData = dashboardData1Week;
      chartData = data["1 week"];
      break;
    case "2": // 3 months
      dashboardData = dashboardData3Months;
      chartData = data["3 months"];
      break;
    case "3": // 6 months
      dashboardData = dashboardData6Months;
      chartData = data["6 months"];
      break;
    default:
      return new Response(JSON.stringify({ error: "Invalid time parameter" }), {
        status: 400,
      });
  }

  const response = {
    dashboard: dashboardData,
    chart: chartData,
  };

  return new Response(JSON.stringify(response), { status: 200 });
}
