"use client";

import { useState, useEffect } from "react";
import { axiosInstance } from "@/api/axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { getHomePageColumns } from "./columns";
import { DataTable } from "@/lib/data-table";
import { toast } from "sonner";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default function Home() {
  const [data, setData] = useState(null); 
  const[tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Fetch data on client side
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/student/customhome");
        setData(response.data); 
        console.log("api data: ", response.data);
        setTableData(response.data.highestGrades);
      } catch (err:any) {
        toast.error(err.response?.data?.error);
      } finally {
        setLoading(false); // Set loading to false after request completion
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on component mount

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  // Data for the bar chart
  const chartData = {
    labels: ["Students", "Professors", "Courses", "Departments"], // X-axis labels (categories)
    datasets: [
      {
        label: "Count", // Label for the bar chart
        data: [
          data.studentCount,
          data.professorCount,
          data.courseCount,
          data.departmentCount,
        ], // Y-axis data
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Border color of bars
        borderWidth: 1, // Border width of bars
      },
    ],
  };

  // Options for customizing the chart
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Let the chart's container size control its aspect ratio
    plugins: {
      legend: {
        position: "top", // Position of the legend
      },
      title: {
        display: true,
        text: "Counts of Students, Professors, Courses, and Departments", // Chart title
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start Y-axis from 0
      },
    },
  };

  const columns = getHomePageColumns();


  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-center">
        {" "}
        {/* Centering the chart on the page */}
        <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          {" "}
          {/* Responsive chart size */}
          <div style={{ height: "300px" }}>
            {" "}
            {/* Fixed height for the chart */}
            <Bar data={chartData} options={chartOptions} />{" "}
            {/* Render the bar chart */}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <DataTable columns={columns} data={tableData} />
      </div>
    </div>
  );
}
