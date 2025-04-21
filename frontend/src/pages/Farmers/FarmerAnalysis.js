// // src/pages/Farmers/FarmerAnalysis.js
// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import useFarmer from "../../hooks/useFarmer";
// // import "./FarmerAnalysis.css"; // Ensure this file exists or adjust the path

// const FarmerAnalysis = () => {
//   const { handleViewSalesAnalysis } = useFarmer();
//   const [analysisData, setAnalysisData] = useState([]);

//   useEffect(() => {
//     const fetchAnalysis = async () => {
//       try {
//         const data = await handleViewSalesAnalysis();
//         // Ensure that analysisData is always an array
//         setAnalysisData(data || []);
//       } catch (error) {
//         console.error("Error loading analysis:", error);
//         setAnalysisData([]);
//       }
//     };

//     fetchAnalysis();
//   }, [handleViewSalesAnalysis]);

//   // Guard against empty or undefined data
//   if (!analysisData || analysisData.length === 0) {
//     return <div>No analysis data available.</div>;
//   }

//   // Prepare data for Chart.js
//   const chartData = {
//     labels: analysisData.map((item) => item.productName),
//     datasets: [
//       {
//         label: "Total Sold",
//         data: analysisData.map((item) => item.totalSold),
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//       },
//       {
//         label: "Total Revenue",
//         data: analysisData.map((item) => item.totalRevenue),
//         backgroundColor: "rgba(255, 99, 132, 0.6)",
//       },
//     ],
//   };

//   return (
//     <div className="analysis-container">
//       <h2>Sales Analysis</h2>
//       <Bar data={chartData} />
//     </div>
//   );
// };

// export default FarmerAnalysis;
